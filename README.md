# VOLTAA

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Contributors Welcome](https://img.shields.io/badge/contributors-welcome-brightgreen)](CONTRIBUTING.md)

## 📝 Sobre o Projeto

**VOLTAA** é uma aplicação desenvolvida com AdonisJS v5 que ajuda a localizar pessoas desaparecidas. A plataforma permite que usuários registrem casos, sigam investigações, façam comentários e recebam atualizações.

### Funcionalidades

- 🧑‍🤝‍🧑 **Registro de Usuários**: Criação de conta para participar da plataforma.
- 🔐 **Login**: Acesso à plataforma para gerenciar e acompanhar casos.
- 📃 **Listagem de Pessoas Desaparecidas**: Visualização de todos os casos registrados.
- 📝 **Registrar Pessoas Desaparecidas**: Permite que os usuários criem um novo registro de pessoa desaparecida.
- 👁️ **Seguir Casos**: Usuários podem observar e seguir casos de interesse para receber notificações.
- 💬 **Comentar em Casos**: Participação ativa com comentários em casos de pessoas desaparecidas.

## 🚀 Tecnologias

Este projeto é construído utilizando as seguintes tecnologias:

- [AdonisJS v5](https://adonisjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/) (para documentação de API)
- [MySQL](https://www.mysql.com/) (banco de dados)

## 📄 Documentação da API

Toda a API está documentada com o **Swagger**. Para acessar a documentação e testar os endpoints:

1. Execute o projeto localmente (veja a seção de instalação abaixo).
2. Acesse: `http://localhost:3333/docs` para ver e interagir com a API.

## 🛠️ Instalação

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- Node.js (>= 14.x)
- PostgreSQL
- AdonisJS CLI

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/Mario-Coxe/missing-persons-finder.git
   cd missing-persons-finder
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` com base no `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Configure o banco de dados no `.env` com suas credenciais do PostgreSQL.

5. Execute as migrations:

   ```bash
   node ace migration:run
   ```

6. Inicie o servidor:

   ```bash
   node ace serve --watch
   ```

Agora, a aplicação estará rodando em `http://localhost:3333`.

## 💡 Como Contribuir

Contribuições são super bem-vindas! Siga os passos abaixo para colaborar:

1. Faça um fork do projeto.
2. Crie uma nova branch com a sua feature ou correção: `git checkout -b minha-feature`.
3. Faça commit das suas mudanças: `git commit -m 'Adicionando nova feature'`.
4. Envie para o branch principal: `git push origin minha-feature`.
5. Crie um **Pull Request** explicando a sua mudança.

### Guia de Contribuição

Veja mais detalhes no [CONTRIBUTING.md](CONTRIBUTING.md).

## 🛡️ Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma **Issue** ou entrar em contato:

- Email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)
- GitHub: [seu-usuario](https://github.com/seu-usuario)

---

Isso é apenas uma base inicial. Você pode adicionar seções específicas, como links para testes unitários, diagramas de arquitetura, ou um exemplo de fluxo de trabalho para desenvolvedores que querem contribuir.
