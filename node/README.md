# Utilizando o nodejs direto no container

## Comando para iniciar o container e trabalhar para testes

```sh
    cd app/
    docker run --rm -it --name node -v ${PWD}/:/usr/src/app -p 3000:3000 node:latest
```

> Tudo que criarmos na pasta /usr/src/app será compartilhado com o nosso host na pasta node/app

## Executando a minha aplicacao

```sh
    docker run --rm -it -d --name node -p 3000:3000 --mount type=bind,source=${PWD}/,target=/usr/src/app node:latest bash -c "cd /usr/src/app && npm start"
```

## Criando uma imagem a partir do meu container

```sh
    docker commit <nome_do_container> <nome_da_imagem>
    docker commit node node/node
```
