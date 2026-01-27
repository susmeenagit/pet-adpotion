# Pet Adoption MERN Stack Project

A complete MERN stack educational pet adoption website inspired by Petfinder, focusing on browsing pets, vaccination schedules, and nutrition & feeding education.

## Tech Stack

- **Frontend**: React.js (Vite), React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based Login & Register

## Features

- Browse pets (Dogs, Cats, Rabbits only)
- View detailed pet information with vaccination schedules
- Interactive vaccination schedule generator
- Nutrition & feeding tips by species and age group
- User authentication (Login/Register)
- Responsive design

## Project Structure

```
pet-adoption/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── BrowsePets.jsx
│   │   │   ├── PetDetails.jsx
│   │   │   ├── VaccinationSchedule.jsx
│   │   │   ├── PetCareTips.jsx
│   │   │   └── Auth.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PetCard.jsx
│   │   │   └── VaccinationTable.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Pet.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── petController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── petRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   └── utils/
│   │       ├── jwt.js
│   │       └── seedData.js
│   ├── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/pet-adoption
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# Make sure MongoDB is running on your system
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:4000`

### Seed Database with Admin User and Data

To create the admin user and seed the database with realistic data, run the seed script:

```bash
cd backend
npm run seed
```

This will create an admin account and multiple regular user accounts with realistic adoption history:

#### Admin Account
- **Email**: `admin@petadoption.com`
- **Password**: `Admin@123`

#### Regular User Accounts (All passwords: `Password@123`)
1. **John Smith** - john.smith@email.com
2. **Sarah Johnson** - sarah.johnson@email.com
3. **Michael Brown** - michael.brown@email.com
4. **Emily Davis** - emily.davis@email.com
5. **David Wilson** - david.wilson@email.com
6. **Jessica Martinez** - jessica.martinez@email.com
7. **Robert Garcia** - robert.garcia@email.com
8. **Lisa Anderson** - lisa.anderson@email.com

#### Seed Data Includes:
- **12 Pets** with realistic information (Dogs, Cats, Rabbits)
- **8 Adoption Records** with various statuses (Approved, Rejected, Pending)
- **Quiz Responses** with different completion statuses
- **Timestamps** spanning 60 days to simulate platform usage over time

Use the admin account to access the admin dashboard at `/admin-dashboard`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults are set):
```env
VITE_API_URL=http://localhost:4000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/admin/users` - Get all users (admin only)
- `GET /api/auth/admin/stats` - Get system statistics (admin only)
- `PUT /api/auth/admin/user/:id/role` - Update user role (admin only)
- `DELETE /api/auth/admin/user/:id` - Delete user (admin only)

### Pets
- `GET /api/pets` - Get all pets
- `GET /api/pets/featured` - Get featured pets
- `GET /api/pets/:id` - Get pet by ID
- `POST /api/pets/admin/create` - Create pet with image upload (admin only)
- `PUT /api/pets/admin/update/:id` - Update pet with image (admin only)
- `DELETE /api/pets/admin/delete/:id` - Delete pet (admin only)

### Adoptions
- `POST /api/adoption` - Submit adoption application
- `GET /api/adoption/admin/all` - Get all adoptions (admin only)
- `GET /api/adoption/admin/:id` - Get adoption by ID (admin only)
- `PUT /api/adoption/admin/:id/status` - Update adoption status (admin only)
- `DELETE /api/adoption/admin/:id` - Delete adoption (admin only)

### Quiz
- `GET /api/quiz` - Get all quizzes
- `POST /api/quiz/response` - Submit quiz response
- `GET /api/quiz/admin/responses` - Get all quiz responses (admin only)

## Image Upload

The application supports image uploads for pet profiles using **Multer**:

### Pet Image Upload
- **Endpoint**: `POST /api/pets/admin/create` or `PUT /api/pets/admin/update/:id`
- **Content-Type**: `multipart/form-data`
- **Max File Size**: 5MB
- **Allowed Formats**: JPG, PNG, GIF, WebP
- **Storage Location**: `backend/uploads/pets/`
- **Filename Format**: `pet_timestamp_randomid.extension`

### How It Works:
1. Admin submits pet form with image file via multipart/form-data
2. Multer validates and stores image in `backend/uploads/pets/` directory
3. Only the filename is saved in the database
4. When fetching pet data, filename is converted to complete URL: `http://localhost:4000/uploads/pets/filename.jpg`
5. Frontend receives complete URLs ready for display
6. On update, old image is deleted and new one replaces it
7. Images are served as static files by Express.js

**Upload Format Example:**
```javascript
const formData = new FormData();
formData.append('name', 'Max');
formData.append('species', 'Dog');
formData.append('breed', 'Golden Retriever');
formData.append('age', '2');
formData.append('ageUnit', 'years');
formData.append('gender', 'Male');
formData.append('height', '60');
formData.append('color', 'Golden');
formData.append('description', 'Friendly dog');
formData.append('image', imageFile); // File object from input

const response = await axios.post('/api/pets/admin/create', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Image URLs in Response**: Images are automatically served with complete URLs:
```
http://localhost:4000/uploads/pets/pet_1704067200000_a1b2c3.jpg
```

**Backend Processing**:
- Images stored relative path in database: `pet_1704067200000_a1b2c3.jpg`
- `getImageUrl()` helper converts to: `http://localhost:4000/uploads/pets/pet_1704067200000_a1b2c3.jpg`
- Old images auto-deleted on pet update/delete using `deleteImageFile()` helper

## Pages

1. **Home** (`/`) - Landing page with featured pets
2. **Browse Pets** (`/browse-pets`) - Browse and filter pets
3. **Pet Details** (`/pet-details/:id`) - Detailed pet information with vaccination table
4. **Vaccination Schedule** (`/vaccination`) - Interactive vaccination schedule generator
5. **Care Tips** (`/care-tips`) - Nutrition & feeding information
6. **Login/Register** (`/login`) - Login/Register page
7. **Admin Dashboard** (`/admin-dashboard`) - Admin panel (accessible only for admin users)

## Pet Types

The project strictly supports only:
- **Dog**
- **Cat**
- **Rabbit**

## Notes

- This is an educational project, not an e-commerce site
- No adoption requests, payments, or admin panel
- Focus on browsing, vaccination schedules, and nutrition education
- Suitable for BCA/TU final semester projects

## License

Educational use only





