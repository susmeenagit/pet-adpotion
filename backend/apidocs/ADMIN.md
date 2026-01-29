# Admin API Documentation

This document outlines all admin-only endpoints. Admin users have complete system control and can perform all super-user actions.

## Authentication

All admin endpoints require:
- **Method**: Authorization header with Bearer token OR cookie-based authentication
- **Header**: `Authorization: Bearer <token>`
- **Cookie**: `token=<token>`

Admin user must have `isAdmin: true` in the database.

## Default Admin Credentials

- **Email**: `admin@petadoption.com`
- **Password**: `Admin@123`

---

## Admin User Management Endpoints

### 1. Get All Users
- **URL**: `GET /api/auth/admin/users`
- **Authentication**: Admin only
- **Response**:
```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@petadoption.com",
      "name": "Admin User",
      "isAdmin": true,
      "createdAt": "2026-01-27T00:00:00.000Z",
      "updatedAt": "2026-01-27T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single User
- **URL**: `GET /api/auth/admin/user/:id`
- **Authentication**: Admin only
- **Parameters**: `id` (user ID)
- **Response**:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": false,
    "createdAt": "2026-01-27T00:00:00.000Z",
    "updatedAt": "2026-01-27T00:00:00.000Z",
    "quizResponses": []
  }
}
```

### 3. Update User Role
- **URL**: `PUT /api/auth/admin/user/:id/role`
- **Authentication**: Admin only
- **Parameters**: `id` (user ID)
- **Body**:
```json
{
  "isAdmin": true
}
```
- **Response**:
```json
{
  "message": "User role updated successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": true
  }
}
```

### 4. Delete User
- **URL**: `DELETE /api/auth/admin/user/:id`
- **Authentication**: Admin only
- **Parameters**: `id` (user ID)
- **Response**:
```json
{
  "message": "User deleted successfully"
}
```

### 5. Get System Statistics
- **URL**: `GET /api/auth/admin/stats`
- **Authentication**: Admin only
- **Response**:
```json
{
  "stats": {
    "totalUsers": 10,
    "totalAdmins": 2,
    "totalPets": 25,
    "totalAdoptions": 5,
    "totalQuizzes": 3,
    "totalQuizResponses": 15
  }
}
```

---

## Admin Pet Management Endpoints

### 1. Create Pet
- **URL**: `POST /api/pets/admin/create`
- **Authentication**: Admin only
- **Body**:
```json
{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 24,
  "ageUnit": "months",
  "gender": "Male",
  "height": 60,
  "heightUnit": "cm",
  "color": "Golden",
  "description": "A friendly golden retriever",
  "image": "https://example.com/image.jpg",
  "vaccinationStatus": "Completed",
  "vaccinations": [
    {
      "name": "Rabies",
      "date": "2026-01-01",
      "nextDue": "2027-01-01"
    }
  ]
}
```
- **Response**:
```json
{
  "message": "Pet created successfully",
  "pet": {
    "id": 1,
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 24,
    "ageUnit": "months",
    "gender": "Male",
    "height": 60,
    "heightUnit": "cm",
    "color": "Golden",
    "description": "A friendly golden retriever",
    "image": "https://example.com/image.jpg",
    "vaccinationStatus": "Completed",
    "vaccinations": [],
    "createdAt": "2026-01-27T00:00:00.000Z",
    "updatedAt": "2026-01-27T00:00:00.000Z"
  }
}
```

### 2. Update Pet
- **URL**: `PUT /api/pets/admin/update/:id`
- **Authentication**: Admin only
- **Parameters**: `id` (pet ID)
- **Body**: (All fields optional)
```json
{
  "name": "Buddy Updated",
  "vaccinationStatus": " Upcoming"
}
```
- **Response**: Same as Create Pet response

### 3. Delete Pet
- **URL**: `DELETE /api/pets/admin/delete/:id`
- **Authentication**: Admin only
- **Parameters**: `id` (pet ID)
- **Response**:
```json
{
  "message": "Pet deleted successfully"
}
```

---

## Admin Adoption Management Endpoints

### 1. Get All Adoptions
- **URL**: `GET /api/adoptions/admin/all`
- **Authentication**: Admin only
- **Response**:
```json
{
  "adoptions": [
    {
      "id": 1,
      "petId": 1,
      "fullName": "John Smith",
      "email": "john@example.com",
      "phone": "555-0123",
      "address": "123 Main St",
      "reason": "I love dogs",
      "createdAt": "2026-01-27T00:00:00.000Z",
      "updatedAt": "2026-01-27T00:00:00.000Z",
      "pet": {
        "name": "Buddy",
        "species": "Dog",
        "breed": "Golden Retriever"
      }
    }
  ]
}
```

### 2. Get Single Adoption
- **URL**: `GET /api/adoptions/admin/:id`
- **Authentication**: Admin only
- **Parameters**: `id` (adoption ID)
- **Response**: Same as Get All Adoptions (single object)

### 3. Update Adoption Status
- **URL**: `PUT /api/adoptions/admin/:id/status`
- **Authentication**: Admin only
- **Parameters**: `id` (adoption ID)
- **Body**:
```json
{
  "status": "approved"
}
```
- **Response**:
```json
{
  "message": "Adoption status updated",
  "adoption": {}
}
```

### 4. Delete Adoption
- **URL**: `DELETE /api/adoptions/admin/:id`
- **Authentication**: Admin only
- **Parameters**: `id` (adoption ID)
- **Response**:
```json
{
  "message": "Adoption deleted successfully"
}
```

---

## Admin Quiz Management Endpoints

All quiz management endpoints are protected with `isAdmin` middleware.

### Quiz Operations
- `POST /api/quiz/admin/quiz` - Create quiz
- `GET /api/quiz/admin/quizzes` - Get all quizzes
- `GET /api/quiz/admin/quiz/:id` - Get single quiz
- `PUT /api/quiz/admin/quiz/:id` - Update quiz
- `DELETE /api/quiz/admin/quiz/:id` - Delete quiz

### Question Operations
- `POST /api/quiz/admin/quiz/:quizId/question` - Add question
- `PUT /api/quiz/admin/question/:questionId` - Update question
- `DELETE /api/quiz/admin/question/:questionId` - Delete question

### Option Operations
- `POST /api/quiz/admin/question/:questionId/option` - Add option
- `PUT /api/quiz/admin/option/:optionId` - Update option
- `DELETE /api/quiz/admin/option/:optionId` - Delete option

### Response Verification
- `GET /api/quiz/admin/responses` - Get all quiz responses
- `PUT /api/quiz/admin/response/:responseId/verify` - Verify response

See [QUIZ.md](QUIZ.md) for detailed quiz endpoint documentation.

---

## Species Allowed

Admin can create/update pets with the following species only:
- `Dog`
- `Cat`
- `Rabbit`

---

## Error Responses

### Unauthorized (401)
```json
{
  "error": "Authentication required"
}
```

### Forbidden (403)
```json
{
  "error": "Admin access required"
}
```

### Not Found (404)
```json
{
  "error": "Resource not found"
}
```

### Server Error (500)
```json
{
  "error": "Server error"
}
```

---

## Admin Permissions Summary

✅ **Can do**:
- View all users, pets, adoptions, quizzes
- Create, update, delete users
- Promote users to admin
- Create, update, delete pets
- Manage adoption records
- Create, manage, and verify quizzes
- View system statistics
- Access all user data

❌ **Cannot do**:
- Delete their own admin account
- Bypass database constraints

---

## Integration with Frontend

The frontend should:
1. Store the JWT token from login response
2. Include token in Authorization header or cookie for all admin requests
3. Check `user.isAdmin` from `/api/auth/me` endpoint
4. Redirect non-admin users away from admin pages
5. Display admin dashboard only if `isAdmin === true`
