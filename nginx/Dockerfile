FROM nginx:latest

# PASTA DO PROJETO
WORKDIR /app

# ATUALIZAR A IMAGEM E INSTALAR O VIM
RUN apt update -y && \
    apt install -y vim

# COPIAR A PASTA SOURCES PARA A PASTA /app
COPY ./static/www/html /usr/share/nginx/html

# ADICIONAR O ENTRYPOINT
ENTRYPOINT ["/docker-entrypoint.sh"]

# ADICIONAR O COMANDO DE EXECUCAO DO NGINX
CMD [ "nginx", "-g", "daemon off;" ]
