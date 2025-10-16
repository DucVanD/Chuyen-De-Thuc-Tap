# Sử dụng PHP 8.2 với Apache
FROM php:8.2-apache

# Cài các gói hệ thống và PHP extension cần thiết
RUN apt-get update && apt-get install -y \
    git zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev && \
    docker-php-ext-install pdo pdo_mysql zip && \
    a2enmod rewrite && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Sao chép composer từ image chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www/html
COPY . /var/www/html

# Cài đặt package Laravel
RUN composer install --no-dev --optimize-autoloader

# Tạo APP_KEY nếu chưa có
RUN php artisan key:generate --force || true

# Clear & cache lại toàn bộ config để tăng tốc
RUN php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Phân quyền cho storage và cache
RUN chmod -R 777 storage bootstrap/cache || true

# Cấu hình Apache trỏ về public/
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# EXPOSE: Render vẫn dùng port 10000, không cần đổi
EXPOSE 10000

# 👉 KHÔNG dùng `php artisan serve` (vì chậm)
# Laravel đã nằm trong /var/www/html/public, Apache tự chạy
CMD ["apache2-foreground"]
