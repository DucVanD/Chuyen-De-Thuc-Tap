# Sử dụng PHP 8.2 với Apache (đã có sẵn composer)
FROM php:8.2-apache

# Cài các gói hệ thống cần thiết (git, unzip, zip,...)
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev && \
    docker-php-ext-install pdo pdo_mysql && \
    docker-php-ext-configure zip && \
    docker-php-ext-install zip && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Sao chép Composer từ image composer chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Sao chép mã nguồn
COPY . /var/www/html

# Đặt thư mục làm việc
WORKDIR /var/www/html/backend

# Cài đặt các package Laravel
RUN composer install --no-dev --optimize-autoloader

# Tạo key (nếu cần)
RUN php artisan key:generate || true

# Mở port cho Railway
EXPOSE 8000

# Lệnh khởi chạy server Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
