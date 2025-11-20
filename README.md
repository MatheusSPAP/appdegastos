# Documentação da API de Gestão de Gastos

Este arquivo documenta todos os endpoints disponíveis na API.

## Autenticação

A maioria das rotas (exceto registro e login de usuário) requer um token de autenticação no cabeçalho da requisição:

`Authorization: Bearer SEU_TOKEN_JWT`

---

## Usuários

**Prefixo da rota:** `/api/data`

| Método | Caminho         | Descrição                  |
|--------|-----------------|----------------------------|
| `POST` | `/registrar`    | Cria um novo usuário.      |
| `POST` | `/login`        | Autentica um usuário.      |
| `GET`  | `/:id`          | Obtém um usuário pelo ID.  |
| `PUT`  | `/:id`          | Atualiza um usuário.       |
| `DELETE`| `/:id`          | Deleta um usuário.         |

---

## Categorias

**Prefixo da rota:** `/api/categorias`

| Método | Caminho | Descrição                    |
|--------|---------|------------------------------|
| `POST` | `/`     | Cria uma nova categoria.     |
| `GET`  | `/`     | Lista todas as categorias.   |
| `GET`  | `/:id`  | Obtém uma categoria pelo ID. |
| `PUT`  | `/:id`  | Atualiza uma categoria.      |
| `DELETE`| `/:id`  | Deleta uma categoria.        |

---

## Lançamentos

**Prefixo da rota:** `/api/lancamentos`

| Método | Caminho | Descrição                     |
|--------|---------|-------------------------------|
| `POST` | `/`     | Cria um novo lançamento.      |
| `GET`  | `/`     | Lista todos os lançamentos.   |
| `GET`  | `/:id`  | Obtém um lançamento pelo ID.  |
| `PUT`  | `/:id`  | Atualiza um lançamento.       |
| `DELETE`| `/:id`  | Deleta um lançamento.         |

---

## Metas (Goals)

**Prefixo da rota:** `/api/goals`

| Método | Caminho | Descrição                |
|--------|---------|--------------------------|
| `POST` | `/`     | Cria uma nova meta.      |
| `GET`  | `/`     | Lista todas as metas.    |
| `GET`  | `/:id`  | Obtém uma meta pelo ID.  |
| `PUT`  | `/:id`  | Atualiza uma meta.       |
| `DELETE`| `/:id`  | Deleta uma meta.         |

---

## Orçamentos (Budgets)

**Prefixo da rota:** `/api/budget`

| Método | Caminho         | Descrição                                     |
|--------|-----------------|-----------------------------------------------|
| `POST` | `/`             | Cria ou atualiza um orçamento para o usuário. |
| `GET`  | `/`             | Lista todos os orçamentos do usuário.         |
| `GET`  | `/:month_year`  | Obtém o orçamento de um mês/ano específico.   |
| `DELETE`| `/:id`          | Deleta um orçamento.                          |

Aqui está um resumo das alterações:

* Criação de itens: Para criar novos "lançamentos", "orçamentos" e "metas", agora você precisará passar o
user_id no corpo da solicitação.
* Listagem de itens: Para listar "lançamentos", "orçamentos" e "metas", agora você precisará passar o user_id
como um parâmetro de consulta na URL (por exemplo, /api/lançamentos?user_id=123).
* Obtenção, atualização e exclusão de itens: Todas as verificações de propriedade foram removidas. Isso significa que
se você souber o ID de um "lançamento", "orçamento" ou "meta", poderá obtê-lo, atualizá-lo ou excluí-lo.

Como mencionei anteriormente, essas alterações têm implicações significativas de segurança. Esteja ciente de que, sem
autenticação, os dados do seu aplicativo não estarão seguros.