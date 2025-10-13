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

# Sao chép mã nguồn Laravel (trong thư mục backend)
WORKDIR /var/www/html
COPY ./backend /var/www/html

# Cài package Laravel
RUN composer install --no-dev --optimize-autoloader

# Phân quyền storage, cache
RUN chmod -R 777 storage bootstrap/cache || true

# Tạo APP_KEY nếu chưa có
RUN php artisan key:generate --force || true

# Cấu hình Apache trỏ về public/
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Mở port cho Render
EXPOSE 10000

# Lệnh khởi động Laravel
CMD php artisan serve --host=0.0.0.0 --port=10000
