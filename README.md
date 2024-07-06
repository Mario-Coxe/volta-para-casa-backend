# DESCRIÇÃO DOS ENDPOINTS

---

# Documentação de Rotas da API RESTful com AdonisJS

Este repositório contém um projeto de API RESTful desenvolvido usando AdonisJS. Abaixo estão detalhadas as rotas disponíveis, seus métodos HTTP correspondentes e os controladores associados.

## Rotas

1. **Rota:** `/v1/api/moments`

   - **Métodos:** GET|HEAD
   - **Controlador:** `MomentsController.index`
   - **Descrição:** Obtém a lista de momentos disponíveis.

2. **Rota:** `/v1/api/moments`

   - **Métodos:** POST
   - **Controlador:** `MomentsController.store`
   - **Descrição:** Cria um novo momento.

3. **Rota:** `/v1/api/moments/:id`

   - **Métodos:** GET|HEAD
   - **Controlador:** `MomentsController.show`
   - **Descrição:** Obtém detalhes de um momento específico pelo seu ID.

4. **Rota:** `/v1/api/moments/:id`

   - **Métodos:** PUT|PATCH
   - **Controlador:** `MomentsController.update`
   - **Descrição:** Atualiza um momento existente pelo seu ID.

5. **Rota:** `/v1/api/moments/:id`

   - **Métodos:** DELETE
   - **Controlador:** `MomentsController.destroy`
   - **Descrição:** Exclui um momento pelo seu ID.

6. **Rota:** `/v1/api/moments/:momentId/comments`

   - **Métodos:** POST
   - **Controlador:** `CommentsController.store`
   - **Descrição:** Adiciona um comentário a um momento específico identificado por `momentId`.

## Instruções de Uso

Para executar este projeto localmente, siga estes passos:

1. Clone este repositório em sua máquina local.
2. Instale as dependências usando o comando `npm install`.
3. Inicie o servidor com `node ace serve --watch`.
4. Acesse a API usando a URL base: `http://localhost:3333`.

## Contribuições

Contribuições são bem-vindas! Se encontrar problemas ou melhorias potenciais, crie uma "issue" ou envie uma solicitação de pull (pull request).

---

Essa documentação oferece uma descrição detalhada das rotas, seus propósitos e como usar o projeto localmente. Você pode copiar e colar este conteúdo diretamente em seu arquivo README.md no GitHub.