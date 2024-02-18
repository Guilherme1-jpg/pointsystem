# Point System

## Pré-requisitos

- Node.js (v18.x) ou inferior
- npm ou yarn
- Docker e Docker Compose
- Banco Neo4j na maquina

## Configuração do Ambiente

1. **Clone este repositório.**

    ```bash
    git clone https://github.com/guilherme1-jgp/pointsystem.git
    ```

2. **Instale as dependências:**

 - Entre na pasta backend e depois frontend
    ```bash
    npm install
    ```
    ```

3. **Copie o arquivo de exemplo de configuração**

    ```bash
    cp .env.example
    ```

    Edite `/.env` conforme necessário.
    Adapte para suas configurações do neo4j

- Acesse a aplicação em [http://localhost:3000](http://localhost:3000) para o backend.
- Acesse a aplicação em [http://localhost:8080](http://localhost:8080).

## Comandos Úteis

- **Executar Testes:**

    ```bash
    npm run test
    ```
    ```

## Executando a Aplicação
- acesse a pasta /backend e digite
    ```bash
    npm run start:watch

- acesse a pasta /front e digite
    ```bash
    npm run start

## Executando a Aplicação DOCKER (opcional)
- acesse a pasta raiz
    ```bash
    docker-compose up

- Lembre-se de adaptar as variaveis de acordo com seu ambiente

## Tecnologias
- Front : Vue3
- Back : Node
- Testes: Mocha e Assert

## Arquitetura do software
- Front: Foi utilizando o padrão Atomic Design, separando em atoms, moleculas e organisms, os devidos componentes
- Back: foi baseado mais nos padroes do SOLID, tendo as camadas de domain e infra

## Dificuldades
- A maior dificuldade foi a limitação da versão do node e nas limitações como a não utilização de um ORM, ou de framework como o nestjs

## Facilidades
- A utilização do javascript, pois já é uma tecnologia que utilizo há 4 anos

## Futuras melhorias
- Sistema de autenticação baseada em JWT e Chaves Pem [ChavesPem](https://github.com/Guilherme1-jpg/Quik)
- Utilização do nestjs
- Um dashboard para o gerenciamento
- E uma estrutura de dados melhor, já que estamos utilizando o neo4j, e seu elementos de dados são baseados em nós e arestas.

## Considerações
- Foi focado mais em questões de arquitetura e alguns principios de clean code.
- O projeto vai ser melhorado para ser um sistema completo e complexo de gerenciamento de pontos com regras de negócio.
- Convido a conhecer meus outros projeto para entender melhor como trabalho.
- Para testar as rotas deixei a collection gerada pelo insomnia.
