# Getting Started Guide

Welcome! This guide helps you quickly understand and run the Pet Adoption project.

## 📚 Step 1: Understand the Project

1. Read **[plan/about-app.md](./plan/about-app.md)** for features and overview
2. Check **[plan/README.md](./plan/README.md)** for documentation index
3. Review **[README.md](./README.md)** for project structure

## 🚀 Step 2: Setup & Run

### Quick Setup (Copy-Paste)

```bash
# Backend Setup
cd backend
npm install
npm run generate
npx prisma db push
npm run seed
npm run dev

# In another terminal:
# Frontend Setup
cd frontend
npm install
npm run dev
```

### What This Does
1. Installs dependencies
2. Creates database schema
3. Seeds 12 pets, 8 users, and 1 admin account
4. Starts backend on http://localhost:4000
5. Starts frontend on http://localhost:5173

## 🔐 Step 3: Test It Out

### Login as Admin
- Email: `admin@petadoption.com`
- Password: `Admin@123`
- Go to: http://localhost:5173/admin-dashboard

### Test as Regular User
- Email: `john.smith@email.com`
- Password: `Password@123`
- Go to: http://localhost:5173

## 📖 Step 4: Learn the System

### Architecture (Simple!)
