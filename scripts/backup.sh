#!/bin/bash

DATE=$(date +%F-%H%M)
BACKUP_DIR="/var/backups/watchstore"
mkdir -p $BACKUP_DIR

echo " Створення резервної копії..."

mysqldump -u watch_user -p'secure_password' watch_store_db > $BACKUP_DIR/db_backup_$DATE.sql
tar -czvf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/watchstore

echo “ Бекап завершено: $BACKUP_DIR"
