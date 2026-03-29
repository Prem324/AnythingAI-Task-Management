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
- **Docker Ready**: Complete Docker and Docker Compose setup.
- **Production Logging**: Winston + Morgan logging for monitoring.
- **Rate Limiting**: Built-in protection against abuse.

## 📖 Documentation

- **[Quick Start & Testing Guide](./QUICK_START_TESTING.md)** - Get up and running in 5 minutes
- **[Complete API Documentation](./API_DOCUMENTATION.md)** - All endpoints with examples
- **[Postman Collection](./POSTMAN_COLLECTION.json)** - Ready-to-import API collection
- **[Architecture & Scalability](./ARCHITECTURE_AND_SCALABILITY.md)** - System design & scaling strategies
- **[Requirements Checklist](./REQUIREMENTS_CHECKLIST.md)** - Assignment compliance verification
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Deploy to Vercel (Frontend) & Render (Backend)

## 🌐 Deployment

- **Frontend**: Deploy on [Vercel](https://vercel.com) - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Backend**: Deploy on [Render](https://render.com) - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Database**: MongoDB Atlas (Free tier: 5GB, Paid: as needed)

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

## 🌐 Cloud Deployment (Vercel + Render)

For a complete production deployment guide, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

Quick deployment summary:

- **Frontend (Vercel)**: Connected to GitHub, auto-deploys on push
- **Backend (Render)**: Connected to GitHub, auto-deploys on push
- **Database (MongoDB Atlas)**: Cloud-hosted MongoDB with free tier

### Deploy in 3 Steps:

1. Set up MongoDB Atlas (free tier available)
2. Deploy backend to Render with environment variables
3. Deploy frontend to Vercel pointing to Render API

[Full deployment guide here →](./DEPLOYMENT_GUIDE.md)

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

| Endpoint                | Method | Desc               | Access        |
| :---------------------- | :----- | :----------------- | :------------ |
| `/api/v1/auth/register` | POST   | Create new account | Public        |
| `/api/v1/auth/login`    | POST   | Get JWT token      | Public        |
| `/api/v1/auth/me`       | GET    | Current profile    | Authenticated |

### Tasks

| Endpoint            | Method | Desc                              | Access        |
| :------------------ | :----- | :-------------------------------- | :------------ |
| `/api/v1/tasks`     | GET    | List tasks (pagination/filtering) | User/Admin    |
| `/api/v1/tasks/:id` | GET    | Single task details               | Owner/Admin   |
| `/api/v1/tasks`     | POST   | Create new task                   | Authenticated |
| `/api/v1/tasks/:id` | PUT    | Update task                       | Owner/Admin   |
| `/api/v1/tasks/:id` | DELETE | Delete task                       | Admin Only    |

---

## 📊 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed with bcrypt, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed'], default: 'pending'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  dueDate: Date,
  user: ObjectId (reference to User, required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication & Authorization

### JWT Flow

1. User registers with email and password
2. Password hashed using bcryptjs (salt rounds: 10)
3. User logs in with credentials
4. Server verifies credentials and generates JWT token
5. Token includes user ID and expires in 1 hour
6. Token sent in Authorization header: `Authorization: Bearer <token>`
7. Middleware verifies token for protected routes

### Role-Based Access Control (RBAC)

- **User Role**: Can view/create/edit own tasks, access public endpoints
- **Admin Role**: Can view/edit/delete all tasks, access admin endpoints
- Task deletion restricted to Admin users only

---

## 🔄 API Request/Response Examples

### Register

**Request:**

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login

**Request:**

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Create Task

**Request:**

```bash
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management system",
  "priority": "high",
  "dueDate": "2026-04-15"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-04-15",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-03-29T10:30:00Z",
    "updatedAt": "2026-03-29T10:30:00Z"
  }
}
```

### Get Tasks (Paginated)

**Request:**

```bash
GET /api/v1/tasks?page=1&limit=10&sort=-createdAt
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    }
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "status": "pending",
      "priority": "high",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-03-29T10:30:00Z"
    }
  ]
}
```

---

## 📊 Scalability & Best Practices

### Architecture Considerations

- **Horizontal Scaling**: Stateless API design enables deployment across multiple servers
- **Load Balancing**: API can be deployed behind load balancer (Nginx/HAProxy) to distribute traffic
- **Database Indexing**: Indexes on `email` (User), `user` (Task), and `createdAt` for optimal query performance
- **Microservices Ready**: Clear separation of concerns allows services to be split into microservices (Auth service, Task service, etc.)

### Performance Optimization

- **Rate Limiting**: Configured at 100 requests per 15 minutes per IP to prevent abuse
- **Pagination**: Tasks endpoint supports pagination with customizable page size (default 10)
- **Field Selection**: Query parameter support for selecting specific fields reduces payload size
- **Sorting & Filtering**: Advanced query capabilities for efficient data retrieval

### Future Scalability Features

- **Redis Caching**: Cache frequently accessed tasks and user sessions
- **Message Queues**: Implement RabbitMQ/Redis for asynchronous task processing
- **Database Replication**: MongoDB replica sets for high availability
- **CDN**: Serve frontend assets from CDN for global distribution
- **Search Optimization**: MongoDB Atlas Search for full-text search capabilities

---

## 📖 Additional Resources

### API Testing

- Use **Postman** or **Insomnia** to test API endpoints
- Import requests from examples above
- Set Authorization header with Bearer token for protected routes

### Environment Variables

**Backend (.env)**

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=1h
JWT_COOKIE_EXPIRE=30
```

---

## 🧪 Future Improvements

- Unit tests for backend controllers (Jest/Mocha/Chai)
- Integration tests for API endpoints
- Integration with Redis for caching task lists
- Email notifications for task deadlines
- Advanced search using MongoDB Atlas Search
- WebSocket support for real-time task updates
- Swagger/OpenAPI documentation
- Automated deployment pipeline (CI/CD)

---

Built by **Antigravity**
