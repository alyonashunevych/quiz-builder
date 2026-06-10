# Quiz Builder 📚

Fullstack application for creating and managing quizzes.

Stack:
- Frontend: React + TypeScript + Bulma (Vite)
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma

---

## 🚀 How to run the project

This project runs frontend and backend **together** using `concurrently`.

---

## ▶️ Start project (recommended)

npm install
npm run dev

This will start:
- Vite frontend
- Node backend (nodemon)

Frontend:
http://localhost:5173

Backend:
http://localhost:3000

---

## 🧪 Build project

npm run build

---

## 🗄️ Database setup (PostgreSQL + Prisma)

### 1. Create database

CREATE DATABASE quiz_builder;

---

### 2. Configure `.env`

In backend/.env:

DB_URL="postgresql://postgres:password@localhost:5433/quiz_builder?schema=public"

---

### 3. Prisma setup

npm run prisma:generate
npm run prisma:migrate

---

## 🧪 Create sample quiz

POST /quizzes

### Body:

{
  "title": "JavaScript Basics",
  "questions": [
    {
      "type": "BOOLEAN",
      "question": "JavaScript is a programming language?",
      "answers": []
    },
    {
      "type": "INPUT",
      "question": "What keyword declares a variable?",
      "answers": []
    },
    {
      "type": "CHECKBOX",
      "question": "Which are JS frameworks?",
      "answers": ["React", "Vue", "Angular"]
    }
  ]
}

---

## 🎯 Features

- Create quizzes
- View quizzes list
- Open quiz details
- Delete quizzes
- Dynamic question types (BOOLEAN / INPUT / CHECKBOX)

---

## 🧠 Notes

- Frontend + backend run together via `concurrently`
- Prisma handles DB layer
- PostgreSQL is used as main database
