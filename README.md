# Auth Microservice com Node.js e API Gateway

Este projeto é um **sistema de autenticação** desenvolvido em **Node.js**, utilizando **JWT** e **Express Gateway**, dentro de uma arquitetura de **microserviços**. Ele centraliza a autenticação, segurança e roteamento das requisições para serviços independentes.

---

## Tecnologias Utilizadas

* **Node.js** + **Express.js** – criação de APIs REST
* **Express Gateway** – API Gateway, roteamento e segurança
* **MongoDB** + **Mongoose** – banco de dados NoSQL e modelagem de dados
* **JWT (JSON Web Token)** – autenticação stateless
* **bcrypt** – hash de senhas
* **Joi** – validação de dados de entrada
* **Rate Limit** – controle de abuso de requisições
* **Arquitetura de Microserviços** – serviços independentes e desacoplados

---

## Funcionalidades

* **Cadastro de utilizador** (`/auth/signup`)

  * Validação de email e senha
  * Hash seguro da senha
  * Armazenamento no MongoDB

* **Login de utilizador** (`/auth/login`)

  * Verificação de credenciais
  * Geração de token JWT com expiração
  * Retorno do token para acesso a rotas protegidas

* **Perfil protegido** (`/auth/profile`)

  * Middleware de autenticação
  * Acesso somente com token válido

* **API Gateway**

  * Roteamento das requisições para os microserviços correspondentes
  * Validação de JWT
  * Rate limit
  * Logging centralizado

* **Microserviços adicionais**

  * **Product Service** (`/products` na porta 3000) – retorna produtos disponíveis
  * **Payment Service** (`/payments/:orderId` na porta 3001) – processa pagamentos por pedido
  * **Order Service** (`/orders` na porta 3002) – gerencia pedidos e retorna status de criação

---

## Estrutura do Projeto

```
project/
│
├─ services/
│  ├─ auth/               # Serviço de autenticação
│  │  ├─ models/          # Modelos do Mongoose
│  │  ├─ middlewares/     # Middleware de autenticação
│  │  └─ app.js           # Entry point
│  │  └─ package.json    # Entry point
│  ├─ products/           # Product Service (porta 3000)
│  ├─ payments/           # Payment Service (porta 3001)
│  └─ orders/             # Order Service (porta 3002)
│
├─ gateway/
│  └─ config.yml          # Configuração do Express Gateway
│
└─ README.md
```

---

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd project
```

2. Instale as dependências de cada serviço:

```bash
cd services/diretorio_do_servico
npm install
```



3. Instale o Express Gateway globalmente (ou localmente):

```bash
npm install -g express-gateway
```

4. Configure o MongoDB localmente em `mongodb://localhost:27017/auth-db`.

---

## Executando o Projeto

### Auth Service

```bash
cd services/auth
node app.js
```

O serviço ficará disponível em: `http://localhost:3003`.

### Microserviços

```bash
cd services/products
node app.js  # porta 3000
cd services/payments
node app.js  # porta 3001
cd services/orders
node app.js  # porta 3002
```

### API Gateway

```bash
cd gateway
eg gateway start
```

O Gateway ficará disponível em: `http://localhost:8080`.

---

## Testando as Rotas

* **Cadastro**: `POST /auth/signup`

  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }
  ```

* **Login**: `POST /auth/login`
  Retorna um token JWT.

* **Perfil protegido**: `POST /auth/profile`
  Enviar header:

  ```
  Authorization: Bearer <token>
  ```

* **Produtos**: `GET /products` (Product Service)

* **Pagamentos**: `GET /payments/:orderId` (Payment Service)

* **Pedidos**: `GET /orders` (Order Service)

---

## Futuras Melhorias

* Implementar **refresh tokens**
* Observabilidade e métricas de uso
* Deploy via Docker e Kubernetes
* Serviços adicionais integrados via Gateway

---
