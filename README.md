# Crosslife Sistema Principal (back-end)
O sistema principal da crosslife disponibiliza uma API REST, que permite ao front-end a ter acesso a diversos recursos ligados ao gerenciamento da academia tanto nas atividades operacionais como as voltadas mais para os clientes e alunos.

Os recursos disponibilizados pela API são:
* Alunos
* Autor
* Avalição Física
* Estoque
* Matrícula
* Notícias
* Orçamento
* Treinos da semana
* Treinador

## Tecnologias (Bibliotecas)
Foram utilizadas as seguintes bibliotecas para o desenvolvimento
* Node.js
* Express
* TypeScript
* TypeORM
* Jsonwebtoken
* Multer
* Tsyringe
* Handlebars
* Celebrate
* Nodemailer

## Requisitos
Para que consiga inicializar a API sem problemas nenhum, é necessário ter as seguintes tecnologias:
* Ter [Git](https://git-scm.com/) para clonar o projeto.
* Ter [Node.js](https://nodejs.org/en/) instalado.
* Ter [Docker](https://www.docker.com/) rodando um container PostgreSQL.

## Como executar o projeto
Seguir o passo a passo para conseguir rodar a aplicação na sua máquina

### 1. Iniciando back-end

#### 1.1. Executando API com npm
```javascript
// Clonando repositório:
git clone https://github.com/caio1902araujo/crosslife-blog-api.git

// Entrando no diretório:
cd crosslife-api

// Instalando dependências:
npm install package.json

// Rodar as migrations:
npm run typeorm migration:run

// Rodar a aplicação:
npm run dev:server
```

#### 1.2. Executando API com yarn
```javascript
// Clonando repositório:
git clone https://github.com/caio1902araujo/crosslife-blog-api.git

// Entrando no diretório:
cd crosslife-api

// Instalando dependências:
yarn

// Rodar as migrations:
yarn typeorm migration:run

// Rodar a aplicação:
yarn dev:server
```
