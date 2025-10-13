FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev && \
    docker-php-ext-install pdo pdo_mysql zip && \
    a2enmod rewrite && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY ./backend /var/www/html

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

RUN chmod -R 777 storage bootstrap/cache || true
RUN php artisan key:generate --force || true

# ✅ Ghi log để Railway thấy tiến trình thực thi
RUN echo "Laravel build complete. Starting Apache..." 

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

EXPOSE 8000

# ✅ Apache foreground giúp container không thoát
CMD service apache2 start && tail -f /var/log/apache2/access.log
