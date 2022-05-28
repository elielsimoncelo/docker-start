FROM php:7.4-cli

# selecionar o diretorio da aplicacao
WORKDIR /var/www

# atualizar a imagem e instalar programas basicos
RUN apt update -y && \
    apt install wget -y && \
    apt install zip unzip -y

# baixar o composer
RUN wget \
    https://raw.githubusercontent.com/composer/getcomposer.org/76a7060ccb93902cd7576b67264ad91c8a2700e2/web/installer \
    -O \
    - -q | \
    php -- --quiet

# instalar o laravel e criar um projeto
RUN php composer.phar create-project --prefer-dist laravel/laravel laravel

# subir o laravel
ENTRYPOINT [ "php", "laravel/artisan", "serve" ]

# comando para adicionar o host (ele pode ser substituido)
CMD [ "--host=0.0.0.0" ]
