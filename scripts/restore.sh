
#!/bin/bash

echo "Відновлення з резервної копії..."

read -p "Введіть дату бекапу (формат: YYYY-MM-DD-HHMM): " DATE

mysql -u watch_user -p'secure_password' watch_store_db < /var/backups/watchstore/db_backup_$DATE.sql
tar -xzvf /var/backups/watchstore/files_backup_$DATE.tar.gz -C /

echo "Відновлення завершено."
