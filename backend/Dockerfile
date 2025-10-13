FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql
RUN apt-get update && apt-get install -y unzip

COPY . /var/www/html
WORKDIR /var/www/html

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
RUN composer install --no-dev --optimize-autoloader
RUN php artisan key:generate

EXPOSE 80

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
