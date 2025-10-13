# ==========================
# Stage 1: PHP + Apache
# ==========================
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

# Copy Composer vào container
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ==========================
# Stage 2: Laravel setup
# ==========================
WORKDIR /var/www/html

# Copy mã nguồn backend (Laravel)
COPY ./backend /var/www/html

# Cài đặt dependencies Laravel
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

# Laravel yêu cầu quyền ghi cho storage và cache
RUN chmod -R 777 storage bootstrap/cache || true

# Copy file .env nếu có (giúp tránh lỗi APP_KEY thiếu)
# Nếu Railway dùng Env Variables thì dòng này không bắt buộc
# COPY ./backend/.env /var/www/html/.env

# Generate key nếu chưa có
RUN php artisan key:generate --force || true

# Cấu hình Apache để serve Laravel từ thư mục public/
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n' > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel

# Đặt DocumentRoot trỏ tới public/
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Mở port và khởi động Apache
EXPOSE 8000
CMD ["apache2-foreground"]
