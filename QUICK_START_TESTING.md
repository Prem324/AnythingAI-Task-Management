# TaskMaster - Quick Start & Testing Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js v18+ installed
- MongoDB running (locally or Atlas)
- Docker & Docker Compose (optional, for containerized setup)

### Option 1: Docker Compose (Fastest)
```bash
# Clone/navigate to project directory
cd task-management

# Start all services
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Option 2: Manual Setup

#### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=1h
JWT_COOKIE_EXPIRE=30
EOF

# Start backend
npm run dev
# Server runs on http://localhost:5000
```

#### 2. Frontend Setup (in new terminal)
```bash
cd frontend
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:3001
```

#### 3. MongoDB Setup
```bash
# If running MongoDB locally (Windows)
# Option A: Using chocolatey
choco install mongodb

# Option B: Using MongoDB community edition installer
# Download from: https://www.mongodb.com/try/download/community

# Option C: Using MongoDB Atlas (Cloud)
# Create account at: https://www.mongodb.com/cloud/atlas
# Replace MONGO_URI in .env with your connection string
```

---

## 🧪 Testing Workflows

### 1. Test with Postman

#### Import Collection
1. Download **POSTMAN_COLLECTION.json** from project root
2. Open Postman
3. Click **Import** → Select the JSON file
4. Adjust **base_url** variable if needed (default: `http://localhost:5000`)

#### Test Flow
```
1. Register User
   ↓
2. Copy token from response
   ↓
3. Set {{token}} variable in Postman
   ↓
4. Test Protected Endpoints (Create, Read, Update, Delete tasks)
```

#### Sample Test Sequence

**Step 1: Register**
```json
POST http://localhost:5000/api/v1/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```
Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "507f...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

**Step 2: Create Task**
```json
POST http://localhost:5000/api/v1/tasks
Headers: Authorization: Bearer <token>
Body:
{
  "title": "My First Task",
  "description": "Testing the API",
  "priority": "high",
  "dueDate": "2026-04-30"
}
```

**Step 3: Get All Tasks**
```
GET http://localhost:5000/api/v1/tasks?page=1&limit=10
Headers: Authorization: Bearer <token>
```

**Step 4: Update Task**
```json
PUT http://localhost:5000/api/v1/tasks/{task_id}
Headers: Authorization: Bearer <token>
Body:
{
  "status": "in-progress",
  "priority": "medium"
}
```

**Step 5: Delete Task** (Admin only)
```
DELETE http://localhost:5000/api/v1/tasks/{task_id}
Headers: Authorization: Bearer <token>
```

---

### 2. Test with cURL

#### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Create Task (replace TOKEN with actual token)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "Testing the API",
    "priority": "high"
  }'
```

#### Get All Tasks
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 3. Test with Frontend UI

#### Login Flow
1. Navigate to `http://localhost:3001`
2. Click "Register" tab
3. Fill in details:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
4. Click "Register"
5. Login with same credentials

#### Dashboard Features
- ✅ View all tasks
- ✅ Create new task (fill form and submit)
- ✅ View task details
- ✅ Update task status/priority
- ✅ Edit task information
- ✅ Delete task (admin only)

---

## 📊 Testing Error Scenarios

### 1. Invalid Credentials
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpassword"
  }'

# Expected: 401 Unauthorized
# Response: { "success": false, "error": "Invalid credentials" }
```

### 2. Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User"
  }'

# Expected: 400 Bad Request
# Response: { "success": false, "error": "\"email\" is required" }
```

### 3. Unauthorized Access (Missing Token)
```bash
curl -X GET http://localhost:5000/api/v1/tasks

# Expected: 401 Unauthorized
# Response: { "success": false, "error": "Not authorized to access this route" }
```

### 4. Invalid Token
```bash
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer invalid_token_here"

# Expected: 401 Unauthorized
# Response: { "success": false, "error": "Not authorized to access this route" }
```

### 5. Admin-Only Endpoint (User Role)
```bash
# As user (non-admin), try to delete a task
curl -X DELETE http://localhost:5000/api/v1/tasks/507f... \
  -H "Authorization: Bearer <user_token>"

# Expected: 403 Forbidden
# Response: { "success": false, "error": "User role user is not authorized to access this route" }
```

---

## 🐛 Debugging Tips

### Backend Logs
```bash
# Terminal where backend is running shows logs
# Format: [timestamp] method path status - response_time ms

# Example:
# GET /api/v1/tasks 200 - 45.234 ms
# POST /api/v1/tasks 201 - 120.456 ms
```

### Database Connection Issues
```bash
# Test MongoDB connection
# In MongoDB shell:
mongosh "mongodb://localhost:27017/task-management"

# Or with MongoDB Compass GUI:
# 1. Download from https://www.mongodb.com/products/compass
# 2. Connect to mongodb://localhost:27017
# 3. View collections: User, Task
```

### JWT Token Issues
```bash
# Decode JWT token to see payload
# Use: https://jwt.io

# Token format: header.payload.signature
# Copy token from Postman response and paste in JWT.io decoder
```

### Frontend Network Issues
```bash
# Check browser console (F12 → Console tab)
# Check Network tab for API requests
# Check XHR/Fetch requests for errors
```

---

## 📋 Complete Testing Checklist

### Authentication Tests
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with wrong credentials
- [ ] Get current user profile
- [ ] Verify JWT token in response
- [ ] Test token expiration (wait 1 hour)

### Task CRUD Tests
- [ ] Create task with required fields
- [ ] Create task with all fields
- [ ] Get all tasks (paginated)
- [ ] Get single task (valid ID)
- [ ] Get single task (invalid ID)
- [ ] Update own task
- [ ] Update other user's task (should fail)
- [ ] Delete task (admin only)
- [ ] Delete task (user role, should fail)

### Validation Tests
- [ ] Register without email
- [ ] Register without password
- [ ] Register with invalid email
- [ ] Create task without title
- [ ] Create task with title < 3 chars
- [ ] Update task with invalid status
- [ ] Create task with invalid priority

### Authorization Tests
- [ ] Access protected route without token
- [ ] Access protected route with invalid token
- [ ] Access protected route with expired token
- [ ] User accessing another user's task
- [ ] User deleting task (should fail)
- [ ] Admin deleting task (should succeed)

### Rate Limiting Tests
- [ ] Send 100 requests in 15 minutes (should work)
- [ ] Send 101st request (should be rate limited)
- [ ] Wait 15 minutes and retry (should work)

---

## 🔧 Environment Configuration

### Development Environment
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=1h
JWT_COOKIE_EXPIRE=30
```

### Production Environment
```env
NODE_ENV=production
PORT=80
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/task-management
JWT_SECRET=strong_random_secret_key_min_32_chars
JWT_EXPIRE=1h
JWT_COOKIE_EXPIRE=30
```

---

## 📚 Documentation Files Reference

| File | Purpose |
|------|---------|
| `API_DOCUMENTATION.md` | Detailed endpoint documentation |
| `POSTMAN_COLLECTION.json` | Ready-to-import Postman collection |
| `ARCHITECTURE_AND_SCALABILITY.md` | System design & scaling strategies |
| `REQUIREMENTS_CHECKLIST.md` | Assignment requirements compliance |
| `README.md` | Project overview & setup |
| This File | Quick start & testing guide |

---

## 🆘 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Error**: `MongooseError: Cannot connect to MongoDB`

**Solutions**:
1. Ensure MongoDB is running: `mongod` or `docker run mongo`
2. Check MONGO_URI in .env file
3. If using MongoDB Atlas, verify connection string
4. Check network connectivity to MongoDB server

### Issue: Port Already in Use
**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
1. Change PORT in .env to different port (e.g., 5001)
2. Kill process using port: 
   - Windows: `netstat -ano | findstr :5000` → `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti :5000 | xargs kill -9`

### Issue: CORS Error in Frontend
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Ensure backend CORS is configured correctly
2. Verify frontend URL matches allowed origin in CORS config
3. Check that Authorization header is included in API calls

### Issue: JWT Token Invalid
**Error**: `Not authorized to access this route`

**Solutions**:
1. Ensure JWT_SECRET matches in .env and token generation
2. Check token hasn't expired (default 1 hour)
3. Verify Authorization header format: `Bearer <token>`
4. Try logging in again to get new token

---

## ✅ Success Indicators

When everything is working correctly:
- ✅ Backend server logs show "Server running on port 5000"
- ✅ Frontend loads at http://localhost:3001
- ✅ Can register and login successfully
- ✅ Can create, read, update tasks
- ✅ Can see all tasks on dashboard
- ✅ JWT token expires after 1 hour
- ✅ Rate limiting prevents spam (100 req/15 min)
- ✅ Error messages are clear and helpful

---

## 🎓 Learning Resources

### JWT & Authentication
- JWT Explanation: https://jwt.io/introduction
- bcrypt: https://www.npmjs.com/package/bcryptjs
- OAuth2 Overview: https://oauth.net/2/

### MongoDB
- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Guide: https://mongoosejs.com/
- MongoDB Compass: https://www.mongodb.com/products/compass

### Express.js
- Express Documentation: https://expressjs.com/
- Middleware Concepts: https://expressjs.com/en/guide/using-middleware.html
- Error Handling: https://expressjs.com/en/guide/error-handling.html

### React
- React Documentation: https://react.dev/
- React Context API: https://react.dev/reference/react/useContext
- Protected Routes: https://reactrouter.com/

---

## 🚀 Next Steps

1. **Complete all tests** from the checklist above
2. **Review API documentation** in API_DOCUMENTATION.md
3. **Understand architecture** in ARCHITECTURE_AND_SCALABILITY.md
4. **Add unit tests** for better code coverage
5. **Deploy to production** using Docker or Kubernetes
6. **Set up monitoring** for errors and performance
7. **Implement caching** with Redis for scalability

---

## 📞 Support

For issues or questions:
1. Check the error message carefully
2. Review relevant documentation file
3. Check browser console (F12) for frontend errors
4. Check terminal/logs for backend errors
5. Use Postman Collection to debug API calls
6. Verify environment variables in .env file

---

**Happy Testing! 🎉**
