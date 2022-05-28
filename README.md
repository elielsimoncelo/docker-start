# docker-start

## Instalação

- [Docker](https://docs.docker.com/engine/install/)

- WSL2
  - https://github.com/codeedu/wsl2-docker-quickstart

## Comandos

```sh
    # Containers ativos
    docker ps

    # Containers ativos e inativos
    docker ps -a

    # Entrar no container em modo interativo no terminal (b ash)
    docker run -it <nome_da_imagem:tag> <commando> 

    # Entrar no container em modo interativo (-it) no terminal (b ash) e remover após sair do container (--rm)
    docker run -it --rm <nome_da_imagem:tag> <commando> 

    # Iniciar um container
    docker start <nome_do_container>
```

## Criar um container com ngnix

```sh
    # Criar um container com ngnix
    # [-d] é de "desatachado" (detached), quer dizer que não vai bloquear o terminal
    docker run -d -p 80:80 --name nginx nginx

    # Criar um container com ngnix
    docker run -d -p 80:80 -p 443:443 -v /var/www/html:/usr/share/nginx/html:ro nginx

    # Criar um container com ngnix e um volume de rede
    docker run -d -p 80:80 -p 443:443 -v /var/www/html:/usr/share/nginx/html:ro -v /var/www/html/logs:/usr/share/nginx/html/logs:rw nginx

    # Criar um container com ngnix e um volume de rede e um volume de rede
    docker run -d -p 80:80 -p 443:443 -v /var/www/html:/usr/share/nginx/html:ro -v /var/www/html/logs:/usr/share/nginx/html/logs:rw -v /var/www/html/logs:/usr/share/nginx/html/logs:rw nginx
```

## Parar e remover um container

```sh
    # Parar um container que está rodando
    docker stop <nome_do_container>

    # Parar um container que está rodando e remover
    docker stop <nome_do_container> && docker rm <nome_do_container>

    # Remover um container que está rodando
    docker rm <nome_do_container>

    # Parar e remover um container que está rodando
    docker rm --force <nome_do_container> # [-f] forçar 

    # Remover todos os containers
    docker container prune -f

    # Remover todos os containers
    docker rm $(docker ps -aq) -f
```

## Como entrar em um container

```sh
    # Executar um comando no container
    docker exec <nome_do_container> <commando>

    # Entrar em um container em modo interativo no terminal (bash)
    docker exec -it <nome_do_container> <commando>
```

## Utilizando o bind mount

- Pasta local mapeada para o seu container

```sh
    # Criar um container com um volume dinâmico
    # macOS
    # [-v] é de "volume" e vai criar uma pasta no host e vai fazer um bind mount no container
    docker run -d --name nginx -p 80:80 -v ${PWD}/static/www/html:/usr/share/nginx/html/ nginx

    # Nova forma de fazer a mesma coisa
    # [--mount] é de "mount" e vai fazer um bind mount no container com uma pasta que existe no host
    docker run -d --name nginx -p 80:80 --mount type=bind,source=${PWD}/static/www/html,target=/usr/share/nginx/html/ nginx
```

## Trabalhando com volumes

```sh
    # Criar um volume
    docker volume create <nome_do_volume>

    # Mapear o volume para um container utilizando o [-v]
    docker run -d --name nginx -p 8080:80 -v <nome_do_volume>:/app nginx

    # Mapear o volume para um container utilizando o [--mount]
    docker run -d --name nginx2 -p 8081:80 --mount type=volume,source=<nome_do_volume>,target=/app nginx

    # Verificando o compartilhamento do volume entre os containers
    docker exec nginx bash -c "cd /app; touch oi"
    docker exec nginx2 bash -c "cd /app; touch oi2"
    docker exec nginx ls -al /app
    docker exec nginx2 ls -al /app
```

## Trabalhando com imagens

- hub.docker.com

```sh
    # Baixar uma imagem do container registry do Docker
    # Ele trabalha com o overlay filesystem (chunks), isto é, se outra imagem contiver a mesma coisa ele não baixa novamente
    docker pull <nome_da_imagem>

    # Listar as imagens do meu docker desktop
    docker images

    # Remover a imagem
    docker rmi <nome_da_imagem>

    # Criando a nossa própria imagem com o Dockerfile
    # [-t] nome da tag
    # [.] pasta onde está o Dockerfile
    docker build -t <nome_da_imagem> .

    # Criando a nossa propria imagem com outro Dockerfile
    docker build -t <nome_da_imagem> -f Dockerfile.dev .
```

## Usando command e entrypoint

- O **ENTRYPOINT** especifica um comando que sempre será executado quando o contêiner for iniciado.
- O **CMD** deve ser usado como uma maneira de definir argumentos padrão para um comando ENTRYPOINT ou para executar um comando em um contêiner.
- **RUN** permite executar comandos dentro da sua imagem do Docker.

## Fazendo o push da imagem no hub.docker.com

```sh
    # Login
    docker login

    # Fazendo o push
    docker push <nome_da_imagem>
```

## Trabalhando com redes no Docker

- Tipos de rede
  - Bridge (Ponte) = Um container pode se comunicar com outro
  - Host = Mescla a rede do container com a rede do host (sem a exposição de portas)
  - Overlay = Fazer com que os containers de maquinas diferentes se comuniquem
  - Macvlan = Colocar um Macaddress para um container
  - NAT = Fazer com que o container seja um NAT da rede do host
  - None = Container nao esta em nenhuma rede

```sh
    # Listar as redes
    docker network ls

    # Remover todas as networks que nao estao sendo utilizadas
    docker network prune -f

    # Inspecionar as redes
    docker network inspect bridge

    # Fazer o attach em um container
    docker attach <nome_do_container>

    # Verificar o ip do container
    ip addr show

    # Criar uma rede
    docker network create --driver bridge <nome_da_rede>

    # Criar um container na minha rede
    # Quando eu informo a rede e possivel fazer o ping pelo nome do container (resolução de nomes)
    docker run -d -it --name <nome_do_container> --network <nome_da_rede> <nome_da_imagem>

    # Conectar um container em uma rede
    docker network connect <nome_da_rede> <nome_do_container>

    # Para acessar o recurso da sua maquina via porta do servico utilize
    host.docker.internal:<porta>

```

## Criando uma rede entre o nginx e o laravel

- Crie as imagens do laravel e do nginx utilizando o Dockerfile.prd

```sh
    # Criar a rede
    docker network create laranet

    # Criar o container do laravel na rede laranet
    docker run -d --network laranet --name laravel sousaeliel/laravel:prd

    # Criar o container do laravel na rede laranet
    docker run -d --network laranet --name laravel sousaeliel/laravel:prd                 

    # Criar o container do nginx na rede laranet
    docker run -d --network laranet --name nginx -p 8080:80 sousaeliel/nginx:prd
```

## Utilizando o docker-compose

```sh
    # Iniciando nossos containers
    docker-compose up

    # Iniciando nossos containers desbloqueando o terminal
    docker-compose up -d

    # Inciando nossos containers forcando o rebuild das imagens
    docker-compose up -d --build

    # Finalizar os nosso containers
    docker-compose down

```