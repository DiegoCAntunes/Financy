

# 💰 Financy – Personal Finance Manager (Backend)

Financy is a backend API built with **Node.js, TypeScript, GraphQL, Prisma, and JWT authentication**, designed to allow users to manage their **personal financial transactions and categories securely**.

The system enforces **strict user ownership**, ensuring that each user can only access and manage their own data.

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- GraphQL (Apollo Server + TypeGraphQL)
- Prisma ORM
- SQLite (development database)
- JWT Authentication
- bcrypt (password hashing)
- Express

---

## 🔐 Authentication & Authorization

- Users can **create an account (register)**
- Users can **log in**
- Passwords are **securely hashed using bcrypt**
- Authentication is handled via **JWT**
- Authenticated user data is injected into the GraphQL context
- All protected operations enforce **user ownership at the service layer**

---

## 📌 Project Requirements

All required features have been fully implemented.

### ✅ User

- [x] O usuário pode criar uma conta e fazer login

### ✅ Transactions

- [x] O usuário pode ver e gerenciar apenas as transações criadas por ele
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível editar uma transação
- [x] Deve ser possível deletar uma transação
- [x] Deve ser possível listar todas as transações

### ✅ Categories

- [x] O usuário pode ver e gerenciar apenas as categorias criadas por ele
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível listar todas as categorias

---

## 🔒 Security & Ownership Rules

- Every **Transaction** and **Category** is linked to a `userId`
- All read/write operations validate ownership before execution
- Users cannot access or modify data belonging to other users
- Category resolution in transactions is **user-scoped**, preventing data leakage

---

## 🧱 Architecture Overview

```
src/
├── resolvers/        # GraphQL resolvers
├── services/         # Business logic & authorization rules
├── models/           # GraphQL object types
├── dtos/             # Input and output DTOs
├── graphql/          # Context and authentication helpers
├── prisma/           # Prisma schema and migrations
└── index.ts          # Application entry point
```

---

## 🧪 Database & Prisma

- Prisma ORM is used for database access
- Prisma Migrate is used for schema evolution
- Relationships:
  - User → Transactions (1:N)
  - User → Categories (1:N)
  - Category → Transactions (1:N)

---

## 🚀 Running the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Run database migrations
```bash
npx prisma migrate dev
```

### 3. Start the server
```bash
npm run dev
```

The GraphQL API will be available at:

```
http://localhost:4000/graphql
```

---

## 📄 GraphQL Schema

The schema is automatically generated and available via GraphQL introspection.
A static schema file can be generated if required.


---

**Author:** Diego Cazetta Antunes  
**Project:** Financy  
**Type:** Academic / Portfolio Project