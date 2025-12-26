Auth endpoints (simple, cookie-based JWT)

Environment:
- Add JWT_SECRET to `backend/.env` (e.g. JWT_SECRET="supersecret")
- Ensure your DB is migrated (see below)

Install extra deps (run in `backend`):
- npm i bcrypt cookie-parser cors
- npm i -D nodemon

Migrate DB (if you haven't applied the `password` change):
- npx prisma migrate dev --name add_user_password
- npx prisma generate

Start server:
- npm run dev  (requires nodemon)
- npm start

Endpoints:
- POST /api/auth/register
  Body: { email, password, name? }
  Returns: 201 { user } and sets an HttpOnly cookie `token` on success

- POST /api/auth/login
  Body: { email, password }
  Returns: 200 { user } and sets cookie `token`

- POST /api/auth/logout
  Clears the `token` cookie

- GET /api/auth/me
  Requires cookie `token`, returns { user }

Notes:
- Cookie is HttpOnly and will be sent for same origin requests or from configured `FRONTEND_URL` when CORS credentials are enabled.
- If you're testing from the browser, ensure fetch includes credentials: fetch(url, { credentials: 'include' })
