# 📋 To-Do List API (Backend)

Este projeto é o **backend** de uma aplicação de gerenciamento de tarefas (To-Do List), desenvolvido com **NestJS**, **PostgreSQL** e **Prisma ORM**. O objetivo é fornecer uma API robusta para criação, leitura, atualização e exclusão de tarefas vinculadas a usuários, com autenticação e testes automatizados.

---

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** – Runtime de JavaScript para execução no servidor.
- **[NestJS](https://nestjs.com/)** – Framework para construção de aplicações Node escaláveis.
- **[Prisma](https://www.prisma.io/)** – ORM moderno e type-safe para banco de dados.
- **[PostgreSQL](https://www.postgresql.org/)** – Banco de dados relacional open source.
- **[Docker](https://www.docker.com/)** – Containerização do banco de dados.
- **[Docker Compose](https://docs.docker.com/compose/)** – Orquestração dos containers.
- **[Visual Studio Code](https://code.visualstudio.com/)** – Editor de código-fonte.

---

## Estrutura do projeto

```
📁 .github/
└── 📁 workflows/
    └── 📄 ci.yml                           # Configuração do GitHub Actions para CI

📁 prisma/
├── 📁 migrations/                          # Diretório gerado automaticamente com as migrações
└── 📄 schema.prisma                        # Definição dos modelos e configuração do Prisma ORM

📁 src/
├── 📁 auth/                                # Módulo de autenticação (JWT)
│   ├── 📁 __mock__/                        # Mocks para testes do módulo de autenticação
│   │   └── 📄 auth.mock.ts
│   ├── 📁 __tests__/                       # Testes unitários de controller e service
│   │   ├── 📄 auth.controller.spec.ts
│   │   └── 📄 auth.service.spec.ts
│   ├── 📁 dto/                             # Data Transfer Objects do auth
│   │   └── 📄 login.dto.ts
│   ├── 📁 entity/                          # Entidade relacionada à autenticação
│   │   └── 📄 auth.entity.ts
│   ├── 📁 guards/                          # Guarda de rota com validação JWT
│   │   └── 📄 jwt-auth.guards.ts
│   ├── 📁 strategy/                        # Estratégia JWT usada no Passport
│   │   └── 📄 jwt.strategy.ts
│   ├── 📄 auth.controller.ts               # Controller das rotas de autenticação
│   ├── 📄 auth.module.ts                   # Módulo do NestJS para auth
│   └── 📄 auth.service.ts                  # Regras de negócio de autenticação

├── 📁 common/                              # Módulos reutilizáveis e utilitários globais
│   ├── 📁 filters/
│   │   └── 📄 http-exception.filter.ts     # Filtro global para tratamento de exceções
│   ├── 📁 interceptors/
│   │   └── 📄 uuid.validation.pipe.ts      # Validação de UUID em parâmetros
│   ├── 📁 swagger/
│   │   ├── 📁 message/                     # Mensagens reutilizadas para documentação Swagger
│   │   │   ├── 📁 auth/
│   │   │   │   └── 📄 auth.message.ts      # Mensagens de erro específicas do módulo de autenticação
│   │   │   ├── 📁 task/
│   │   │   │   └── 📄 task.message.ts      # Mensagens de erro específicas do módulo de tarefas
│   │   │   ├── 📁 user/
│   │   │   │   └── 📄 user.message.ts      # Mensagens de erro específicas do módulo de usuários
│   │   │   └── 📄 message-common.ts        # Mensagens comuns reutilizadas
│   │   ├── 📄 bad-request.task.swagger.ts  # Swagger para erros de requisição malformada (task)
│   │   ├── 📄 bad-request.swagger.ts       # Swagger para requisição inválida genérica
│   │   ├── 📄 conflict.swagger.ts          # Swagger para erros de conflito (ex: título duplicado)
│   │   ├── 📄 delete-tasks.swagger.ts      # Swagger para deleção de tarefas
│   │   ├── 📄 not-found.swagger.ts         # Swagger para erros 404 (não encontrado)
│   │   └── 📄 unauthorized.swagger.ts      # Swagger para erros de autenticação (401)

├── 📁 prisma/
│   ├── 📄 module.ts                        # Módulo NestJS para o Prisma
│   └── 📄 service.ts                       # Serviço do Prisma para injeção de dependência

📁 swagger/
└── 📄 swagger.config.ts                    # Configuração principal do Swagger

📁 task/                                    # Módulo de tarefas (to-do)
├── 📄 __mock__task.mock.ts                 # Mocks para testes do módulo de tarefas
├── 📁 __tests__/
│   ├── 📄 task.controller.spec.ts          # Testes unitários do TaskController
│   └── 📄 task.service.spec.ts             # Testes unitários do TaskService
├── 📁 dto/
│   ├── 📄 create-task.dto.ts               # DTO para criação de tarefas
│   ├── 📄 update-description-task.dto.ts   # DTO para atualizar a descrição da tarefa
│   └── 📄 update-status-task.dto.ts        # DTO para atualizar o status da tarefa
├── 📁 dto/entity/
│   └── 📄 task.entity.ts                   # Entidade de tarefas
├── 📄 task-status.enum.ts                  # Enumeração de status de tarefas
├── 📄 task.controller.ts                   # Controller com endpoints de tarefas
├── 📄 task.module.ts                       # Módulo do NestJS para tarefas
└── 📄 task.service.ts                      # Lógica de negócio das tarefas

📁 user/                                    # Módulo de usuários
├── 📄 __mock__user.mock.ts                 # Mocks usados nos testes da camada de usuários
├── 📁 __tests__/
│   ├── 📄 user.controller.spec.ts          # Testes unitários do UserController
│   └── 📄 user.service.spec.ts             # Testes unitários do UserService
├── 📁 dto/
│   ├── 📄 create-user.dto.ts               # DTO para criação de usuários
│   ├── 📄 update-user.dto.ts               # DTO para atualização de dados do usuário
│   └── 📁 entity/
│       └── 📄 user.entity.ts               # Entidade que representa o usuário
├── 📄 user.controller.ts                   # Controller com rotas para manipulação de usuários
├── 📄 user.module.ts                       # Módulo de usuários
└── 📄 user.service.ts                      # Serviço com a lógica de manipulação de usuários

📄 module.ts                                # Módulo principal da aplicação
📄 main.ts                                  # Arquivo principal para bootstrap da aplicação

📁 test/
├── 📄 app.e2e-spec.ts                      # Testes end-to-end da aplicação
└── 📄 jest-e2e.json                        # Configuração específica para testes e2e

📄 .editorconfig                            # Regras de formatação para editores
📄 .gitignore                               # Arquivos/diretórios ignorados pelo Git
📄 .prettierrc                              # Configuração do Prettier
📄 docker-compose.yml                       # Configuração de serviços em container (Postgres, app)
📄 eslint.config.mjs                        # Configuração do ESLint
📄 example.env                              # Arquivo exemplo de variáveis de ambiente
📄 LICENSE                                  # Licença do projeto
📄 package.json                             # Dependências e scripts do Node.js
📄 README.md                                # Documentação do projeto
📄 tsconfig.build.json                      # Configuração do TypeScript para build
📄 tsconfig.json                            # Configuração geral do TypeScript

```

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/CristianoSFMothe/todo-list-backend.git

# Acesse o diretório
cd todo-list-backend

# Instale as dependências
npm install
```

---

## 🐳 Banco de Dados com Docker

Inicie o banco de dados PostgreSQL utilizando o Docker Compose:

```bash
docker-compose up -d
```

Após isso, aplique as migrações com:

```bash
npx prisma migrate dev
```

---

## ▶️ Execução do Projeto

### Ambiente de desenvolvimento:

```bash
npm run start:dev
```

Esse comando executa o servidor com **hot reload**, ou seja, ele reinicia automaticamente ao detectar alterações nos arquivos.

### Ambiente de produção:

```bash
npm run start
```

Este comando executa o projeto de forma estável, sem reinicializações automáticas.

---

## ✅ Testes Unitários

Testes são essenciais para garantir a **confiabilidade** e **manutenção** da aplicação. Este projeto utiliza o **Jest** para testes unitários de serviços e controladores.

### Rodar todos os testes:

```bash
npm run test
```

### Gerar relatório de cobertura:

```bash
npm run test:cov
```

### Testes específicos:

```bash
# Testes do módulo de usuário
npm run test:user:service
npm run test:user:controller

# Testes do módulo de tarefas
npm run test:task:service
npm run test:task:controller

# Testes do módulo de autenticação
npm run test:auth:service
npm run test:auth:controller
```

### ✅ Testes Automatizados

Este projeto possui testes unitários cobrindo os serviços e controladores dos módulos de autenticação, usuários e tarefas. Os testes garantem que as regras de negócio estão funcionando corretamente e ajudam a prevenir regressões futuras.

#### ✔️ Resultados dos Testes

| Arquivo de Teste          | Status    |
| ------------------------- | --------- |
| `user.service.spec.ts`    | ✅ Passou |
| `auth.service.spec.ts`    | ✅ Passou |
| `task.service.spec.ts`    | ✅ Passou |
| `user.controller.spec.ts` | ✅ Passou |
| `auth.controller.spec.ts` | ✅ Passou |
| `task.controller.spec.ts` | ✅ Passou |

✔ **Total de suítes**: 6
✔ **Total de testes**: 46
✅ **Todos os testes passaram com sucesso!**

---

#### 📈 Cobertura de Testes (`npm run test:cov`)

O projeto possui **100% de cobertura** em todas as áreas:

| Categoria / Pasta                         | Cobertura |
| ----------------------------------------- | --------- |
| Autenticação (`auth`)                     | 100%      |
| Usuários (`user`)                         | 100%      |
| Tarefas (`task`)                          | 100%      |
| DTOs, Enums e Entidades                   | 100%      |
| Validações e mensagens Swagger (`common`) | 100%      |

✅ **Todas as funcionalidades, fluxos e validações estão completamente cobertas por testes.**

---

#### 🧪 Comandos Disponíveis para Testes

- `npm run test` — Executa todos os testes unitários.
- `npm run test:cov` — Executa os testes e exibe o relatório de cobertura.
- `npm run test:user:service` — Testa apenas o service de usuários.
- `npm run test:user:controller` — Testa apenas o controller de usuários.
- `npm run test:task:service` — Testa apenas o service de tarefas.
- `npm run test:task:controller` — Testa apenas o controller de tarefas.
- `npm run test:auth:service` — Testa apenas o service de autenticação.
- `npm run test:auth:controller` — Testa apenas o controller de autenticação.

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! Sinta-se à vontade para:

- **Fazer um fork** do projeto
- **Clonar** o repositório:

  ```bash
  git clone https://github.com/CristianoSFMothe/todo-list-backend.git
  ```

- Criar uma branch para sua feature ou correção
- Enviar um **Pull Request** com sua proposta de melhoria

---

## 👤 Autor

Desenvolvido por **Cristiano da Silva Ferreira**.

- 📎 [Portfólio](https://portfolio-qa-cristiano.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/cristiano-da-silva-ferreira/)

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Sinta-se livre para usá-lo e modificá-lo conforme necessário.
