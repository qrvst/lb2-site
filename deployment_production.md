 Інструкція з розгортання у production-середовищі
Цей документ містить покрокову інструкцію для розгортання сайту з продажу годинників на виробничому сервері. Розгортання передбачає використання LAMP-стеку з WordPress.
1. Вимоги до апаратного забезпечення
Параметр
Мінімальні вимоги
Рекомендовані
Архітектура
x86_64
x86_64
CPU
2 ядра
4 ядра
RAM
2 GB
4–8 GB
Диск
10 GB SSD
20+ GB SSD
Мережа
Порт 80/443 відкриті
+ резервний канал
Примітка: Обсяг диску може бути вищим у залежності від кількості медіафайлів (зображення годинників, бекапи тощо).
 2. Необхідне програмне забезпечення
    • ОС: Ubuntu Server 22.04 LTS (або інша Linux-сумісна)
    • Web-сервер: Apache 2.4+
    • PHP: ≥ 8.3
    • MySQL/MariaDB: ≥ 5.7
    • Certbot: для SSL-сертифікатів
    • Git: для отримання коду з репозиторію
    • WP-CLI (опціонально): для автоматизації встановлення WordPress
    • ufw: для керування фаєрволом
3. Налаштування мережі
    1. Відкрити порти:
       sudo ufw allow 22
       sudo ufw allow 80
       sudo ufw allow 443
       sudo ufw enable
    2. Прописати DNS-запис для домену watchstore.com → IP сервера.
    3. Встановити SSL:
       sudo apt install certbot python3-certbot-apache
       sudo certbot --apache -d watchstore.com -d www.watchstore.com
4. Конфігурація серверів
Apache:
Створити віртуальний хост /etc/apache2/sites-available/watchstore.conf:
<VirtualHost *:80>
    ServerName watchstore.com
    DocumentRoot /var/www/watchstore
    <Directory /var/www/watchstore>
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/watchstore_error.log
    CustomLog ${APACHE_LOG_DIR}/watchstore_access.log combined
</VirtualHost>
sudo a2ensite watchstore.conf
sudo a2enmod rewrite
sudo systemctl reload apache2
5. Налаштування СУБД
sudo mysql -u root -p
CREATE DATABASE watch_store_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'watch_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON watch_store_db.* TO 'watch_user'@'localhost';
FLUSH PRIVILEGES;
6. Розгортання коду
    1. Клонувати репозиторій:
       git clone https://github.com/your-username/watch-store.git /var/www/watchstore
    2. Встановити права:
       sudo chown -R www-data:www-data /var/www/watchstore
       sudo chmod -R 755 /var/www/watchstore
    3. Завантажити резервну копію БД (якщо є):
       mysql -u watch_user -p watch_store_db < backup.sql
    4. Відредагувати файл wp-config.php:
       define( 'DB_NAME', 'watch_store_db' );
       define( 'DB_USER', 'watch_user' );
       define( 'DB_PASSWORD', 'secure_password' );
       define( 'DB_HOST', 'localhost' );
    5. Очистити кеш і перезапустити Apache:
       sudo systemctl restart apache2
7. Перевірка працездатності
Дія
Очікуваний результат
Перейти за адресою https://watchstore.com
Відкривається головна сторінка
Зайти в адмінку https://watchstore.com/wp-admin
Доступна панель керування
Перевірити консоль браузера
Відсутні помилки JS
Перевірити /var/log/apache2/error.log
Відсутні критичні помилки
Створити тестове замовлення
Проходить успішно
