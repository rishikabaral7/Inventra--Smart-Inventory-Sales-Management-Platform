<h1 align="center">
  <br>
  INV Inventra
  <br>
</h1>

<h3 align="center">Smart Inventory &amp; Sales Management Platform</h3>

<p align="center">
  A full-stack ERP platform for managing products, inventory, suppliers, purchases, and sales — powered by a GraphQL API and a modern React UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-0.139-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Strawberry_GraphQL-0.321-e91e8c?style=for-the-badge&logo=graphql&logoColor=white" alt="Strawberry" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/SQLAlchemy-2.0-red?style=for-the-badge" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [GraphQL API](#graphql-api)
- [Role-Based Access Control](#role-based-access-control)
- [Pages and Modules](#pages-and-modules)
- [Contributing](#contributing)

---

## Overview

**Inventra** is a production-ready, full-stack inventory and sales management system designed for small to medium businesses. It provides a unified workspace for tracking stock, managing suppliers, processing sales, recording purchases, and analysing business performance — all through a single, modern web interface.

The backend is built with **FastAPI** and exposes a single **GraphQL endpoint** (via Strawberry) that the React frontend consumes using **Apollo Client**. Authentication is handled with **JWT tokens**, and access to resources is protected by a **role-based permissions system**.

---

## Features

| Module | Description |
|--------|-------------|
| **Authentication** | JWT-based login / register with bcrypt password hashing |
| **Role-Based Access** | Admin, Manager, and Salesperson permission tiers |
| **Dashboard** | Live KPIs — total revenue, stock value, low-stock alerts, top products |
| **Products** | Full CRUD: add, edit, delete, and search products with category tagging |
| **Categories** | Manage product categories used across inventory |
| **Inventory** | View all inventory transactions with full audit trail |
| **Sales** | Create point-of-sale invoices, auto-deducts stock, generates sale records |
| **Purchases** | Record purchase orders from suppliers, auto-increments stock |
| **Suppliers** | Full CRUD for supplier management |
| **Users** | Admin-only user management (create, view, assign roles) |
| **Profile** | User profile view with role and account information |
| **Reports** | Dashboard summary reports and analytics |

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.10+ | Runtime |
| **FastAPI** | 0.139 | HTTP framework |
| **Strawberry GraphQL** | 0.321 | GraphQL layer |
| **SQLAlchemy** | 2.0 | ORM / database layer |
| **Alembic** | 1.18 | Database migrations |
| **PostgreSQL** | 14+ | Relational database |
| **psycopg2-binary** | 2.9 | PostgreSQL adapter |
| **python-jose** | 3.5 | JWT encoding / decoding |
| **passlib + bcrypt** | 1.7 / 4.0 | Password hashing |
| **pydantic** | 2.13 | Data validation and settings |
| **python-dotenv** | 1.2 | Environment variable loading |
| **uvicorn** | 0.51 | ASGI server |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19 | UI framework |
| **Vite** | 8 | Build tool and dev server |
| **Apollo Client** | 4 | GraphQL client |
| **Redux Toolkit** | 2.12 | Global state management |
| **React Router DOM** | 7 | Client-side routing |
| **TailwindCSS** | 4 | Utility-first CSS |
| **Axios** | 1.18 | HTTP client (supplemental) |

---

## Project Structure

```
Inventra/
├── backend/                        # FastAPI + Strawberry GraphQL server
│   ├── app/
│   │   ├── auth/                   # JWT handler, dependencies, permissions
│   │   │   ├── dependencies.py
│   │   │   ├── jwt_handler.py
│   │   │   ├── password.py
│   │   │   └── permissions.py
│   │   ├── config/                 # App configuration (settings)
│   │   ├── core/                   # GraphQL context (request, user, db session)
│   │   │   └── context.py
│   │   ├── database/               # SQLAlchemy engine, session, create_tables script
│   │   │   ├── connection.py
│   │   │   └── create_tables.py
│   │   ├── graphql/                # GraphQL schema, queries, mutations, types
│   │   │   ├── schema.py           # Root schema combining all Query/Mutation types
│   │   │   ├── queries/            # product, sale, purchase, supplier, user, dashboard, report
│   │   │   ├── mutations/          # product, sale, purchase, supplier, user
│   │   │   ├── types/              # Strawberry type definitions
│   │   │   └── input/              # Strawberry input types
│   │   ├── middleware/             # DatabaseSessionMiddleware
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── category.py
│   │   │   ├── supplier.py
│   │   │   ├── sale.py / sale_item.py
│   │   │   ├── purchase.py / purchase_item.py
│   │   │   └── inventory_transaction.py
│   │   ├── repositories/           # Data access layer (raw DB queries)
│   │   ├── resolvers/              # Business logic bridging services and GraphQL
│   │   ├── schemas/                # Pydantic schemas
│   │   ├── services/               # Business logic (user, product, sale, purchase...)
│   │   └── utils/                  # Shared utilities
│   ├── alembic/                    # Database migrations
│   │   └── versions/
│   │       └── 64386e3c7300_add_role_to_users.py
│   ├── main.py                     # FastAPI app entry point
│   ├── requirements.txt
│   ├── .env.example
│   └── alembic.ini
│
└── frontend/                       # React + Vite SPA
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar/            # Navigation sidebar with role-aware menu
    │   │   ├── common/             # Reusable tables (Product, Sale, Purchase, Supplier...)
    │   │   ├── dashboard/          # Dashboard KPI cards and charts
    │   │   ├── forms/              # Shared form components
    │   │   └── ui/                 # Generic UI primitives
    │   ├── constants/
    │   │   └── menu.js             # Sidebar menu items per role
    │   ├── features/               # Feature-scoped logic/state
    │   ├── graphql/
    │   │   ├── queries/            # Apollo gql query documents
    │   │   └── mutations/          # Apollo gql mutation documents
    │   ├── hooks/                  # Custom React hooks (useLogin, useRegister...)
    │   ├── layouts/                # Page layout wrappers
    │   ├── pages/
    │   │   ├── Login/
    │   │   ├── Register/
    │   │   ├── Dashboard/
    │   │   ├── Products/
    │   │   ├── Categories/
    │   │   ├── Inventory/
    │   │   ├── Sales/
    │   │   ├── Purchases/
    │   │   ├── Suppliers/
    │   │   ├── Users/
    │   │   ├── Profile/
    │   │   ├── Unauthorized/
    │   │   └── NotFound/
    │   ├── redux/
    │   │   ├── store.js            # Redux store
    │   │   ├── authSlice.js        # Auth state (user, token)
    │   │   └── uiSlice.js          # UI state (sidebar, modals)
    │   ├── router/                 # React Router route definitions with guards
    │   ├── services/               # API service layer
    │   ├── utils/                  # Helpers and formatters
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Prerequisites

Make sure the following are installed on your machine:

- **Python** 3.10 or higher — https://www.python.org/downloads/
- **Node.js** 18 or higher — https://nodejs.org/
- **PostgreSQL** 14 or higher — https://www.postgresql.org/download/
- **Git** — https://git-scm.com/

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Inventra--Smart-Inventory-Sales-Management-Platform.git
cd Inventra--Smart-Inventory-Sales-Management-Platform
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate a virtual environment

# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend (from root)
cd frontend

# Install Node.js dependencies
npm install
```

---

## Environment Variables

### Backend — `backend/.env`

Copy `.env.example` to `.env` and fill in your values:

```bash
# Windows
copy backend\.env.example backend\.env

# macOS / Linux
cp backend/.env.example backend/.env
```

```env
# PostgreSQL connection string
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/inventra_db

# JWT secret key — change this in production!
SECRET_KEY=your-very-secure-secret-key-here

# JWT signing algorithm
ALGORITHM=HS256

# Token expiry in minutes
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

> **Warning:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Database Setup

### 1. Create the PostgreSQL database

```sql
-- Run in psql or pgAdmin
CREATE DATABASE inventra_db;
```

### 2. Run Alembic migrations

```bash
# From the backend directory (with venv active)
alembic upgrade head
```

### 3. (Alternative) Create tables directly via script

```bash
# From the backend directory
python -m app.database.create_tables
```

---

## Running the Application

### Backend — FastAPI + Uvicorn

```bash
# From the backend directory (with venv active)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at:

| URL | Description |
|-----|-------------|
| `http://localhost:8000/graphql` | GraphQL Playground / endpoint |
| `http://localhost:8000/docs` | Swagger auto-generated API docs |

### Frontend — Vite Dev Server

```bash
# From the frontend directory
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## GraphQL API

The entire backend is exposed via a single **GraphQL endpoint** at `/graphql`.

### Queries

| Query | Description | Auth Required |
|-------|-------------|:---:|
| `products` | List all products with stock info | Yes |
| `product(id)` | Get a single product | Yes |
| `categories` | List all product categories | Yes |
| `suppliers` | List all suppliers | Yes |
| `sales` | List all sales / invoices | Yes |
| `sale(id)` | Get sale details with line items | Yes |
| `purchases` | List all purchase orders | Yes |
| `purchase(id)` | Get purchase with line items | Yes |
| `users` | List all users | Admin / Manager |
| `me` | Get current authenticated user | Yes |
| `dashboard` | Aggregated KPIs and metrics | Yes |
| `reportSummary` | Business report summary | Yes |

### Mutations

| Mutation | Description | Auth Required |
|----------|-------------|:---:|
| `register` | Create new user account | Public |
| `login` | Authenticate and receive JWT | Public |
| `createProduct` | Add new product | Admin / Manager |
| `updateProduct` | Edit existing product | Admin / Manager |
| `deleteProduct` | Remove a product | Admin |
| `createSale` | Record a new sale (deducts stock) | Yes |
| `createPurchase` | Record a purchase order (adds stock) | Admin / Manager |
| `createSupplier` | Add a new supplier | Admin / Manager |
| `updateSupplier` | Edit supplier info | Admin / Manager |
| `deleteSupplier` | Remove a supplier | Admin |
| `createUser` | Create a user via admin panel | Admin |

### Authentication Header

All authenticated requests must include the JWT token:

```
Authorization: Bearer <your_jwt_token>
```

---

## Role-Based Access Control

Inventra supports three user roles with different permission tiers:

| Role | Permissions |
|------|------------|
| **Admin** | Full access — manage users, all CRUD operations, delete records |
| **Manager** | Create and edit products, suppliers, purchases and sales; view reports; cannot delete |
| **Salesperson** | Create sales, view products and inventory; no administrative access |

Role enforcement happens at two levels:
- **Backend** — GraphQL resolvers check the user role before executing operations
- **Frontend** — Protected routes and conditionally rendered UI elements based on role

---

## Pages and Modules

| Route | Page | Roles Allowed |
|-------|------|--------------|
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Dashboard and KPIs | All |
| `/products` | Product list and management | All |
| `/categories` | Category management | Admin, Manager |
| `/inventory` | Inventory transaction log | All |
| `/sales` | Sales / POS | All |
| `/purchases` | Purchase orders | Admin, Manager |
| `/suppliers` | Supplier management | Admin, Manager |
| `/users` | User management | Admin |
| `/profile` | My profile | All |
| `/unauthorized` | Access denied | — |

---

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes using conventional commits:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request against the `main` branch

**Commit prefixes:** `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`

---

<p align="center">
  Built with FastAPI · Strawberry GraphQL · React · PostgreSQL
</p>
