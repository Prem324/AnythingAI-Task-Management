# TaskMaster - Full-Stack Task Management System

TaskMaster is a modern, full-stack productivity tool built with Node.js, Express, MongoDB, and React. It features robust authentication, Role-Based Access Control (RBAC), and a premium user experience.

## ✨ Features
- **Authentication**: Secure JWT-based auth with bcrypt password hashing.
- **RBAC**: Multi-role support (User & Admin).
- **CRUD Operations**: Full management of tasks with pagination and filtering.
- **Secure Routes**: Backend middleware to protect resources.
- **Modern UI**: Built with React and Vanilla CSS (custom design system).
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop.
- **Animations**: Fluid micro-animations with Framer Motion and custom CSS.

## 🛠 Tech Stack
- **Frontend**: Vite, React, Axios, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.
- **Security**: JWT, bcryptjs, Joi validation, Express Rate Limit.
- **Logging**: Morgan & Winston (Production-ready logging).

---

## 🚀 Quick Start (Dockerized)
The easiest way to run the app is using Docker Compose:

```bash
docker-compose up --build
```
Access points:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 🛠 Manual Installation

### 1. Prerequisite
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` folder:
```text
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1h
JWT_COOKIE_EXPIRE=30
```
Run backend: `npm run dev`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Accessed at `http://localhost:3000`.

---

## 🌉 API Documentation

### Authentication
| Endpoint | Method | Desc | Access |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/register` | POST | Create new account | Public |
| `/api/v1/auth/login` | POST | Get JWT token | Public |
| `/api/v1/auth/me` | GET | Current profile | Authenticated |

### Tasks
| Endpoint | Method | Desc | Access |
| :--- | :--- | :--- | :--- |
| `/api/v1/tasks` | GET | List tasks (pagination/filtering) | User/Admin |
| `/api/v1/tasks/:id` | GET | Single task details | Owner/Admin |
| `/api/v1/tasks` | POST | Create new task | Authenticated |
| `/api/v1/tasks/:id` | PUT | Update task | Owner/Admin |
| `/api/v1/tasks/:id` | DELETE | Delete task | Admin Only |

---

## 📊 Scalability & Best Practices
- **Middleware-First Architecture**: Keeps controllers clean and focused.
- **Global Error Handling**: Centralized catch-all for all API errors.
- **Security-First**: Includes rate limiting, CORS setup, and input sanitization.
- **Optimized Frontend**: Efficient state management and lazy loading where possible.

---

## 🧪 Future Improvements
- Unit tests for backend controllers (Mocha/Chai).
- Integration with Redis for caching task lists.
- Email notifications for urgent tasks.
- Advanced search using MongoDB Atlas Search.

---

Built by **Antigravity**
