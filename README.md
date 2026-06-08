# Portfolio App

A starter portfolio project with:
- React frontend
- Node.js + Express backend
- MongoDB data storage
- Login/logout and backend-controlled data access

## Setup

1. Install dependencies:
   - `npm install --prefix server`
   - `npm install --prefix client`
2. Create a `.env` file in `server/` using `.env.example`.
3. Start the backend:
   - `npm run dev --prefix server`
4. Start the frontend:
   - `npm run dev --prefix client`

## Backend

- `server/index.js`: Express server
- `server/routes/auth.js`: Login and register
- `server/routes/profile.js`: Protected portfolio data
- `server/models/User.js`: MongoDB user model
- `server/config/db.js`: MongoDB connection

## Frontend

- `client/src/App.jsx`: Login/logout, user state, protected profile
- `client/src/LoginForm.jsx`: Login form
- `client/src/Profile.jsx`: Portfolio data display
- `client/src/api.js`: API calls to backend

## Notes

- Use `MONGO_URI` in `server/.env` for MongoDB connection.
- After login, the frontend stores the JWT in localStorage and fetches protected data.
