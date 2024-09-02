# Projeto 3 - Backend

## Descrição

Este é o backend do Projeto 3 da disciplina de Programação Web Fullstack. O backend foi desenvolvido utilizando Express.js e é responsável por gerenciar a autenticação de usuários, realizar operações de busca e inserção de personagens no banco de dados.

## Funcionalidades

- **Login**: Autenticação de usuários para acesso às funcionalidades de busca e inserção.
- **Busca**: Permite ao usuário buscar personagens armazenados no banco de dados.
- **Inserção**: Permite ao usuário adicionar novos personagens ao sistema.

## Tecnologias Utilizadas

- Express.js
- MongoDB como banco de dados
- Mongoose para modelagem dos dados
- JWT (JSON Web Token) para autenticação
- Bcrypt para hashing de senhas
- Winston para logging
- Redis para estratégia de cache

## Instalação e Configuração

1. **Clone o repositório:**
    ```bash
    git clone git@github.com:Matari73/Projeto3-WebFullstack-Back.git
    ```

2. **Navegue até o diretório do projeto:**
    ```bash
    cd Projeto3-WebFullstack-Back
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
    ```text
    DB_CONNECTION_STR
    SECRET_KEY
    REDIS_HOST
    REDIS_PORT

5. **Inicie a aplicação:**
      ```bash
    npm run dev
    ```

6. **Rode o script de inserção no banco de dados**
    ```bash
   node ./src/scripts/seed.js
    ```
