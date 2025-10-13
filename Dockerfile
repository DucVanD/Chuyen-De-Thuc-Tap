# Sử dụng PHP 8.2 với Apache (có sẵn Composer)
FROM php:8.2-apache

# Cài các extension Laravel cần
RUN docker-php-ext-install pdo pdo_mysql

# Cài Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Sao chép toàn bộ code vào container
COPY . /var/www/html

# Đặt thư mục làm việc
WORKDIR /var/www/html/backend

# Cài đặt các package Laravel
RUN composer install --no-dev --optimize-autoloader

# Tạo key và migrate DB (tùy chọn)
RUN php artisan key:generate

# Expose cổng 8000 cho Railway
EXPOSE 8000

# Lệnh chạy server Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
