# Admin System Overview

## What Changed

The admin system has been completely revamped to ensure:
1. **Real Data**: Admin information is stored in the database, not mocked
2. **Super User Privileges**: Admin can perform all system operations
3. **Complete Control**: Admin can manage users, pets, adoptions, and quizzes

---

## Admin User Details

### Default Admin Account
- **Email**: `admin@petadoption.com`
- **Password**: `Admin@123`
- **Role**: Super User (isAdmin = true)

This account is created during database seeding and stored in MariaDB.

---

## How Admin Works

### 1. Authentication
Admin users log in like regular users via `/api/auth/login`. Upon successful login, they receive a JWT token that proves they are an admin.

### 2. Authorization
Every admin endpoint checks if `req.user.isAdmin === true` before allowing access. If not admin, the request returns `403 Forbidden`.

### 3. Database Storage
Admin status is stored in the `User` table with an `isAdmin` boolean field.

```sql
SELECT id, email, name, isAdmin FROM User;
-- Result:
-- id | email                    | name       | isAdmin
-- 1  | admin@petadoption.com    | Admin User | true
-- 2  | user@example.com         | John Doe   | false
```

---

## Admin Permissions

### User Management
- ✅ View all users
- ✅ View individual user details
- ✅ Promote/demote users to admin
- ✅ Delete users (except themselves)

### Pet Management
- ✅ Create pets
- ✅ Update pet information
- ✅ Delete pets
- ✅ Manage vaccinations

### Adoption Management
- ✅ View all adoption applications
- ✅ Update adoption status
- ✅ Delete adoption records

### Quiz Management
- ✅ Create quizzes
- ✅ Add/edit/delete questions
- ✅ Add/edit/delete options
- ✅ Verify user quiz responses
- ✅ Manage active quizzes

### System Management
- ✅ View system statistics (total users, pets, adoptions, etc.)
- ✅ Full CRUD operations on all resources

---

## API Endpoints

### Authentication
```
POST   /api/auth/login              - Login as admin
POST   /api/auth/register           - Register new user
POST   /api/auth/logout             - Logout
GET    /api/auth/me                 - Get current user info
```

### User Management (Admin Only)
```
GET    /api/auth/admin/users        - Get all users
GET    /api/auth/admin/user/:id     - Get user by ID
PUT    /api/auth/admin/user/:id/role - Update user role
DELETE /api/auth/admin/user/:id     - Delete user
GET    /api/auth/admin/stats        - Get system statistics
```

### Pet Management (Admin Only)
```
POST   /api/pets/admin/create       - Create new pet
PUT    /api/pets/admin/update/:id   - Update pet
DELETE /api/pets/admin/delete/:id   - Delete pet
```

### Adoption Management (Admin Only)
```
GET    /api/adoptions/admin/all     - Get all adoptions
GET    /api/adoptions/admin/:id     - Get adoption by ID
PUT    /api/adoptions/admin/:id/status - Update status
DELETE /api/adoptions/admin/:id     - Delete adoption
```

### Quiz Management (Admin Only)
See [backend/apidocs/ADMIN.md](../backend/apidocs/ADMIN.md) for full quiz endpoints.

---

## Frontend Integration

### Using Admin APIs

```javascript
// Import admin API helpers
import { apiAdminStats, apiAdminPets, apiAdminUsers, apiAdminAdoptions } from '@/api/adminApi';

// Get system statistics
const { stats } = await apiAdminStats.getStats();
console.log(stats.totalUsers, stats.totalPets, stats.totalAdoptions);

// Create a pet
const { pet } = await apiAdminPets.create({
  name: 'Buddy',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: 24,
  ageUnit: 'months',
  gender: 'Male',
  height: 60,
  heightUnit: 'cm',
  color: 'Golden',
  description: 'A friendly dog',
  image: 'https://example.com/image.jpg',
  vaccinationStatus: 'Completed',
  vaccinations: []
});

// Update user role
await apiAdminUsers.updateRole(userId, true); // Make user admin

// Manage adoptions
const { adoptions } = await apiAdminAdoptions.getAll();
await apiAdminAdoptions.updateStatus(adoptionId, 'approved');
```

### Check Admin Status in Components

```javascript
import { useEffect, useState } from 'react';
import { apiAuth } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { user } = await apiAuth.me();
        if (user.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkAdmin();
  }, [navigate]);

  if (!isAdmin) return <div>Loading...</div>;

  return <div>Welcome Admin!</div>;
}
```

---

## Database Schema

### User Table
```prisma
model User {
  id               Int               @id @default(autoincrement())
  email            String            @unique
  password         String
  name             String
  isAdmin          Boolean           @default(false)  // TRUE for admins
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  quizResponses    QuizResponse[]
  adoptionVerifications AdoptionVerification[]
}
```

---

## Security

### Token-Based Authentication
- Admin privileges are verified on every request
- JWT tokens prove the user's identity
- Invalid/expired tokens are rejected with 401 error

### Admin-Only Middleware
```javascript
export const isAdmin = async (req, res, next) => {
  // 1. Verify JWT token
  // 2. Fetch user from database
  // 3. Check if user.isAdmin === true
  // 4. Allow or deny access
};
```

### No Mock Data
- All admin data comes from the real MariaDB database
- No hardcoded or faked data in the system
- Real CRUD operations on database records

---

## Seeding Admin Account

The admin account is created during database seeding:

```bash
cd backend
npm run seed
```

This runs `src/utils/seedDatabase.js` which:
1. Checks if admin already exists
2. If not, creates admin with email and hashed password
3. Sets `isAdmin = true` in database
4. Logs success message

---

## Migration Guide

If you need to create additional admin accounts:

### Option 1: Via API (if admin endpoint exists)
```
POST /api/auth/register
{
  "email": "newadmin@example.com",
  "password": "SecurePass123",
  "name": "New Admin"
}

// Then use admin account to promote via:
PUT /api/auth/admin/user/:id/role
{
  "isAdmin": true
}
```

### Option 2: Direct Database Update
```sql
UPDATE User SET isAdmin = true WHERE email = 'user@example.com';
```

---

## Testing Admin Features

### Using cURL
```bash
# Login as admin
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@petadoption.com","password":"Admin@123"}' \
  -c cookies.txt

# Get system stats
curl http://localhost:4000/api/auth/admin/stats \
  -b cookies.txt

# Create a pet
curl -X POST http://localhost:4000/api/pets/admin/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name":"Buddy",
    "species":"Dog",
    "breed":"Golden Retriever",
    "age":24,
    "ageUnit":"months",
    "gender":"Male",
    "height":60,
    "heightUnit":"cm",
    "color":"Golden",
    "description":"A friendly dog"
  }'
```

---

## Summary

✅ **Real Admin System**
- Admin account stored in database with `isAdmin = true`
- Login credentials: admin@petadoption.com / Admin@123
- No mock data or hardcoded values

✅ **Complete Control**
- Admin can manage all users, pets, adoptions, and quizzes
- System statistics available
- Full CRUD operations on all resources

✅ **Secure**
- JWT token-based authentication
- Admin middleware checks on every request
- Database constraints enforced

✅ **Well-Documented**
- API documentation at `backend/apidocs/ADMIN.md`
- Frontend helpers in `frontend/src/api/adminApi.js`
- Clear examples for integration
