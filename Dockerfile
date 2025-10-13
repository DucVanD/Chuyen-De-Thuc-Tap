# Sử dụng PHP 8.2 với Apache
FROM php:8.2-apache

# Cài các gói hệ thống và PHP extension cần thiết
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

# Sao chép composer từ image chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Đặt thư mục làm việc (root Laravel)
WORKDIR /var/www/html

# Sao chép toàn bộ project vào container
COPY . .

# Cài đặt Laravel packages
RUN composer install --no-dev --optimize-autoloader

# Thiết lập quyền ghi cho storage & bootstrap/cache
RUN chmod -R 777 storage bootstrap/cache

# Tạo key ứng dụng (nếu chưa có)
RUN php artisan key:generate || true

# Thiết lập cấu hình Apache cho Laravel
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n' > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel

# Biến môi trường mặc định
ENV PORT=8000
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Sửa DocumentRoot cho Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Expose port cho Railway
EXPOSE 8000

# Khởi chạy Apache (ổn định hơn php artisan serve)
CMD ["apache2-foreground"]
