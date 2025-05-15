# 🏛️ Notification System – Proof of Concept

A minimal backend + frontend system to demonstrate notifications on a social platform.

## 🚀 Overview

This POC demonstrates:
- User creation and following logic
- Post creation triggering notifications
- Notification feed per user
- Next.js frontend to display notifications

---

## 🧰 Tech Stack

| Layer      | Tech          |
|------------|---------------|
| Frontend   | Next.js       |
| Backend    | Node.js + Express |
| ORM        | Prisma        |
| Database   | SQLite (for POC) |
| Hosting    | Render (backend), Vercel (frontend) |

---

## 🏗️ Project Structure

.
├── backend/
│ ├── src/
│ │ └── index.ts # Express app with routes
│ ├── prisma/
│ │ └── schema.prisma # DB schema
│ └── package.json
├── frontend/
│ ├── pages/
│ │ └── notifications.tsx # UI to display notifications
│ └── package.json
└── README.md

---

## ⚙️ Setup Instructions

### Clone repo
git clone https://github.com/your-username/notifications-poc.git
cd notifications-poc

### Backend Setup
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

Endpoints:

POST /user — create user
POST /follow — follow a user
POST /post — create post (triggers notification)
GET /notifications/:userId — get notifications

SQLite DB: ./dev.db

### Frontend Setup
cd ../frontend
npm install
npm run dev

Access via: http://localhost:3000/notifications

Testing (via Postman)
Create users: POST /user

Follow: POST /follow

Create post: POST /post

Get notifications: GET /notifications/:userId
