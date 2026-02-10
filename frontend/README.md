

# 💰 Financy – Personal Finance Manager (Frontend)

Financy is a frontend application built with **React, TypeScript, Vite, GraphQL (Apollo Client), and Tailwind CSS**, designed to provide a modern and intuitive interface for managing personal financial transactions and categories.

The application enforces **user-scoped data access**, ensuring that each user can only view and manage their own data.

---

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite (bundler)
- GraphQL (Apollo Client)
- Tailwind CSS
- Radix UI + shadcn/ui
- React Hook Form + Zod (form validation)
- Zustand (state management)
- React Router DOM v7

---

## 🔐 Authentication & User Experience

- Users can **create an account (register)**
- Users can **log in**
- Authentication state is managed via **Zustand store**
- JWT tokens are stored and automatically sent with GraphQL requests
- Protected routes redirect unauthenticated users to login
- "Remember me" functionality for persistent sessions

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

### ✅ Frontend-Specific Requirements

- [x] É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como `bundler`
- [x] Siga o mais fielmente possível o layout do Figma

---

## 🔒 Security & Data Isolation

- All API requests include the user's JWT token for authentication
- GraphQL queries/mutations are scoped to the authenticated user
- Users cannot access or modify data belonging to other users
- Sensitive data is never stored in plain text

---

## 🧱 Architecture Overview

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── auth/            # Auth-related components
│   ├── layout/          # App shell, header, sidebar
│   ├── transactions/    # Transaction modals and components
│   └── categories/      # Category modals and components
├── pages/               # Route page components
├── graphql/
│   ├── operations.graphql  # GraphQL queries/mutations
│   ├── schema.graphql      # Copy of backend schema
│   └── generated.ts        # Codegen output (DO NOT EDIT)
├── stores/              # Zustand stores
├── schemas/             # Zod validation schemas
├── lib/                 # Utilities, Apollo client config
└── routes/              # Router configuration
```

---

## 🎨 UI/UX Features

- **Dashboard**: Summary cards showing total balance, monthly income/expenses, and recent transactions
- **Transactions Page**: Full CRUD with filtering by type, category, and search; pagination support
- **Categories Page**: Grid layout with category cards, usage statistics, and full CRUD operations
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS
- **Toast Notifications**: User feedback via Sonner toast library
- **Form Validation**: Client-side validation with Zod schemas

---

## 🚀 Running the Project

### 1. Install dependencies
```bash
pnpm install
```

### 2. Start the development server
```bash
pnpm dev
```

The application will be available at:

```
http://localhost:5173
```

> **Note**: Make sure the backend server is running on port 4000 before starting the frontend.

---

## 🧪 Development Scripts

```bash
pnpm dev          # Start Vite dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm type-check   # TypeScript check
pnpm test         # Run tests (vitest)
pnpm test:watch   # Tests in watch mode
```

---

## 📊 GraphQL Workflow

1. Backend schema auto-generates to `backend/schema.graphql` on server start
2. Copy schema to `frontend/src/graphql/schema.graphql`
3. Define operations in `frontend/src/graphql/operations.graphql`
4. Run codegen to generate typed hooks:
```bash
pnpm dlx @graphql-codegen/cli
```

---

**Author:** Diego Cazetta Antunes
**Project:** Financy
**Type:** Academic / Portfolio Project
