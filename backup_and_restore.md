Резервне копіювання та відновлення проєкту
Цей документ описує політику бекапів, практичні інструкції для DevOps/release engineer, скрипти для автоматизації та сценарії відновлення проєкту «Сайт з продажу годинників» (WordPress + MySQL + Apache2).
1.  Стратегія резервного копіювання
1.1 Типи резервних копій
Тип
Опис
Повні
Копіюється вся база + файли (використовується щоденно або щотижнево)
Інкрементальні
Зберігаються тільки зміни з моменту останньої повної копії
Диференціальні
Зберігаються зміни з моменту останньої повної копії
Для цього проєкту достатньо повних щоденних копій + інкрементальних кожні 2-3 години (у production).
1.2 Частота створення резервних копій
Компонент
Частота
База даних
Щодня (повна), кожні 3 години (інкрементальна)
Файли сайту
Щоденно
Конфігурації
При кожній зміні
Логи
Раз на добу
1.3 Зберігання та ротація копій
    • Бекапи зберігаються в: /var/backups/watchstore/
    • Архіви зберігаються до 7 днів, далі видаляються автоматично.
    • Копії також синхронізуються в хмарне сховище (Google Drive або AWS S3).
    • Ротація керується скриптом або cron.
2. Процедура резервного копіювання
2.1 База даних

mysqldump -u watch_user -p watch_store_db > /var/backups/watchstore/db_$(date +%F-%H%M).sql
2.2 Файли конфігурацій
tar -czf /var/backups/watchstore/config_$(date +%F).tar.gz /etc/apache2/sites-available/watchstore.conf /var/www/watchstore/wp-config.php
2.3 Користувацькі дані (зображення, медіа)

tar -czf /var/backups/watchstore/uploads_$(date +%F).tar.gz /var/www/watchstore/wp-content/uploads
2.4 Логи системи

cp /var/log/apache2/access.log /var/backups/watchstore/logs_access_$(date +%F).log
cp /var/log/apache2/error.log /var/backups/watchstore/logs_error_$(date +%F).log3. Перевірка цілісності резервних копій
3.1 Контрольна сума архівів

sha256sum /var/backups/watchstore/*.tar.gz > /var/backups/watchstore/checksums.txt
Для перевірки:

sha256sum -c /var/backups/watchstore/checksums.txt
4. Автоматизація процесу резервного копіювання
4.1 Bash-скрипт
Файл: scripts/backup.sh

#!/bin/bash

DATE=$(date +%F-%H%M)
BACKUP_DIR="/var/backups/watchstore"
mkdir -p $BACKUP_DIR

# DB
mysqldump -u watch_user -p'secure_password' watch_store_db > $BACKUP_DIR/db_$DATE.sql

# Configs
tar -czf $BACKUP_DIR/config_$DATE.tar.gz /etc/apache2/sites-available/watchstore.conf /var/www/watchstore/wp-config.php

# Uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/watchstore/wp-content/uploads

# Logs
cp /var/log/apache2/*.log $BACKUP_DIR/

# Checksums
sha256sum $BACKUP_DIR/* > $BACKUP_DIR/checksums_$DATE.txt

echo " Бекап завершено."
4.2 Автоматичне виконання через cron

crontab -e

0 2 * * * /bin/bash /home/ubuntu/watchstore/scripts/backup.sh
5. Відновлення з резервних копій
5.1 Повне відновлення системи
# Відновлення БД
mysql -u watch_user -p watch_store_db < /var/backups/watchstore/db_<дата>.sql

# Відновлення файлів сайту
tar -xzvf /var/backups/watchstore/uploads_<дата>.tar.gz -C /

# Відновлення конфігів
tar -xzvf /var/backups/watchstore/config_<дата>.tar.gz -C /

# Перезапуск
sudo systemctl restart apache2
5.2 Вибіркове відновлення (наприклад, лише медіа)

tar -xzvf uploads_<дата>.tar.gz -C /var/www/watchstore/wp-content/uploads
5.3 Тестування відновлення
    • Перейти на сайт: https://watchstore.com
    • Перевірити:
        ◦ Завантаження зображень
        ◦ Роботу бази
        ◦ Наявність останніх товарів/замовлень
        ◦ Відсутність помилок у логах:
          tail -f /var/log/apache2/error.log
