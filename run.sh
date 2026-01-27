#!/bin/bash

# Start backend and frontend concurrently

echo "Starting backend..."
cd backend
npm install

echo "Seeding database..."
npm run seed || echo "Warning: Database seeding failed, but continuing with backend startup..."

npm start &
BACKEND_PID=$!

echo "Starting frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "Backend (PID: $BACKEND_PID) and Frontend (PID: $FRONTEND_PID) are running."
echo "Press Ctrl+C to stop both servers."

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
