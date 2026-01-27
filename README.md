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

### Seed Database with Admin User

To create the admin user, run the seed script:

```bash
cd backend
npm run seed
```

This will create an admin account with the following credentials:
- **Email**: `admin@petadoption.com`
- **Password**: `Admin@123`

Use these credentials to log in and access the admin dashboard.

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

### Pets
- `GET /api/pets` - Get all pets (with optional filters)
- `GET /api/pets/featured` - Get featured pets
- `GET /api/pets/:id` - Get pet by ID

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





