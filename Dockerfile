# Sử dụng PHP 8.2 với Apache
FROM php:8.2-apache

# Cài gói hệ thống & PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev && \
    docker-php-ext-install pdo pdo_mysql zip && \
    a2enmod rewrite && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Sao chép composer từ image composer chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Sao chép mã nguồn của backend vào container
WORKDIR /var/www/html
COPY ./backend /var/www/html

# Cài đặt Laravel packages
RUN composer install --no-dev --optimize-autoloader

# Thiết lập quyền ghi
RUN chmod -R 777 storage bootstrap/cache

# Tạo key ứng dụng (nếu cần)
RUN php artisan key:generate || true

# Thiết lập Apache cho Laravel
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n' > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel

# Đặt DocumentRoot trỏ tới /public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Expose port và khởi động Apache
EXPOSE 8000
CMD ["apache2-foreground"]
