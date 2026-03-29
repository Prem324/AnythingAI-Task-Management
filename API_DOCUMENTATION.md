# TaskMaster API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /auth/register`  
**Access:** Public  
**HTTP Status:** 201 Created

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)",
  "role": "string (optional, enum: ['user', 'admin'], default: 'user')"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- **400 Bad Request:**
  ```json
  {
    "success": false,
    "error": "User already exists"
  }
  ```
- **400 Bad Request (Validation):**
  ```json
  {
    "success": false,
    "error": "\"email\" must be a valid email"
  }
  ```

---

### 2. Login User
Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`  
**Access:** Public  
**HTTP Status:** 200 OK

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- **401 Unauthorized:**
  ```json
  {
    "success": false,
    "error": "Invalid credentials"
  }
  ```

---

### 3. Get Current User
Retrieve authenticated user's profile.

**Endpoint:** `GET /auth/me`  
**Access:** Protected (Requires valid JWT)  
**HTTP Status:** 200 OK

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-03-29T10:30:00Z",
    "updatedAt": "2026-03-29T10:30:00Z"
  }
}
```

**Error Responses:**
- **401 Unauthorized:**
  ```json
  {
    "success": false,
    "error": "Not authorized to access this route"
  }
  ```

---

## Task Endpoints

### 1. Get All Tasks
Retrieve paginated list of tasks.

**Endpoint:** `GET /tasks`  
**Access:** Protected (Requires valid JWT)  
**HTTP Status:** 200 OK

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (default: 1) | `?page=2` |
| `limit` | number | Items per page (default: 10) | `?limit=20` |
| `sort` | string | Sort field (prefix with - for desc) | `?sort=-createdAt` |
| `select` | string | Fields to include (comma-separated) | `?select=title,status` |
| `status` | string | Filter by status | `?status=pending` |
| `priority` | string | Filter by priority | `?priority=high` |

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    },
    "prev": {
      "page": 1,
      "limit": 10
    }
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "description": "Finish the task management system",
      "status": "pending",
      "priority": "high",
      "dueDate": "2026-04-15T00:00:00Z",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-03-29T10:30:00Z",
      "updatedAt": "2026-03-29T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- **401 Unauthorized:**
  ```json
  {
    "success": false,
    "error": "Not authorized to access this route"
  }
  ```

---

### 2. Get Single Task
Retrieve details of a specific task.

**Endpoint:** `GET /tasks/:id`  
**Access:** Protected (Requires valid JWT)  
**HTTP Status:** 200 OK

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Task ID (MongoDB ObjectId) |

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-04-15T00:00:00Z",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2026-03-29T10:30:00Z",
    "updatedAt": "2026-03-29T10:30:00Z"
  }
}
```

**Error Responses:**
- **404 Not Found:**
  ```json
  {
    "success": false,
    "error": "Task not found with id of 507f1f77bcf86cd799439012"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "success": false,
    "error": "User 507f1f77bcf86cd799439011 is not authorized to access this task"
  }
  ```

---

### 3. Create Task
Create a new task.

**Endpoint:** `POST /tasks`  
**Access:** Protected (Requires valid JWT)  
**HTTP Status:** 201 Created

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "string (required, min 3 characters)",
  "description": "string (optional)",
  "priority": "string (optional, enum: ['low', 'medium', 'high'], default: 'medium')",
  "dueDate": "string (optional, ISO 8601 date)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-04-15T00:00:00Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-03-29T10:30:00Z",
    "updatedAt": "2026-03-29T10:30:00Z"
  }
}
```

**Error Responses:**
- **400 Bad Request (Validation):**
  ```json
  {
    "success": false,
    "error": "\"title\" is required,\"title\" length must be at least 3 characters long"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "success": false,
    "error": "Not authorized to access this route"
  }
  ```

---

### 4. Update Task
Update an existing task.

**Endpoint:** `PUT /tasks/:id`  
**Access:** Protected (Requires valid JWT, Owner or Admin)  
**HTTP Status:** 200 OK

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Task ID (MongoDB ObjectId) |

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (all optional):**
```json
{
  "title": "string (min 3 characters)",
  "description": "string",
  "status": "string (enum: ['pending', 'in-progress', 'completed'])",
  "priority": "string (enum: ['low', 'medium', 'high'])",
  "dueDate": "string (ISO 8601 date)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project - Updated",
    "description": "Finish the task management system",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-04-15T00:00:00Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-03-29T10:30:00Z",
    "updatedAt": "2026-03-29T11:00:00Z"
  }
}
```

**Error Responses:**
- **404 Not Found:**
  ```json
  {
    "success": false,
    "error": "Task not found with id of 507f1f77bcf86cd799439012"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "success": false,
    "error": "User 507f1f77bcf86cd799439011 is not authorized to access this task"
  }
  ```

---

### 5. Delete Task
Delete a task.

**Endpoint:** `DELETE /tasks/:id`  
**Access:** Protected (Admin only)  
**HTTP Status:** 200 OK

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Task ID (MongoDB ObjectId) |

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

**Error Responses:**
- **404 Not Found:**
  ```json
  {
    "success": false,
    "error": "Task not found with id of 507f1f77bcf86cd799439012"
  }
  ```
- **403 Forbidden:**
  ```json
  {
    "success": false,
    "error": "User role user is not authorized to access this route"
  }
  ```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication failed or token invalid |
| 403 | Forbidden - Authenticated but not authorized |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message describing the issue"
}
```

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Limit:** 100 requests per 15 minutes per IP address
- **Headers:** Response includes rate limit information

---

## Validation Rules

### User Registration
- Name: Required, non-empty string
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Role: Optional, default 'user' (enum: ['user', 'admin'])

### Task Creation/Update
- Title: Required for creation, minimum 3 characters
- Description: Optional, string
- Status: Optional, enum: ['pending', 'in-progress', 'completed'], default: 'pending'
- Priority: Optional, enum: ['low', 'medium', 'high'], default: 'medium'
- DueDate: Optional, valid ISO 8601 date

---

## Testing with Postman

1. Import the `POSTMAN_COLLECTION.json` file into Postman
2. Set the `base_url` variable to `http://localhost:5000`
3. Register a new user via the Register endpoint
4. Copy the returned JWT token
5. Set the `token` variable in Postman to the copied token
6. Use protected endpoints with the token in the Authorization header

---

## Curl Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "priority": "high"
  }'
```

### Get Tasks
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```
