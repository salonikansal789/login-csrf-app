## Login Auth Node.js (JWT + CSRF + MongoDB + React)

This project is a full-stack authentication system with:

1. Backend (Node.js + Express + MongoDB + TypeScript)

   - JWT stored in HttpOnly cookies

   - CSRF protection with csurf

   - Modular structure (controllers, services, middleware, models)

2. Frontend (React + Vite + JavaScript)

   - Login / Logout with CSRF token handling

   - WhoAmI endpoint (fetch authenticated user)

## 📂 Folder Structure

```plaintext
LOGIN_AUTH_NODEJS/
├── backend/                 # Express + MongoDB + TypeScript backend
│   ├── dist/                # Compiled JS files (after build)
│   ├── src/                 # Source code
│   │   ├── config/          # Config files (env, constants)
│   │   ├── controller/      # Controllers (handle requests)
│   │   ├── interface/       # Interfaces (TS types)
│   │   ├── middleware/      # Middlewares (auth, csrf, etc.)
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── errors/          # Errors
│   │   ├── types/           # Type definitions
│   │   ├── utils/           # Helpers (db connection etc.)
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── .env                 # Environment variables
│   ├── nodemon.json         # Nodemon config
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript config
│
└── frontend/                # React + Vite frontend
    ├── public/              # Static assets
    ├── src/                 # React components
    ├── index.html           # HTML entry point
    ├── vite.config.js       # Vite config (proxy for backend)
    ├── package.json         # Frontend dependencies
    └── README.md

``` 




##  Backend Setup

1. Install dependencies
   
- cd backend

- npm install

2.. Configure environment

- Create a .env file in /backend:

PORT=4000

MONGO_URI=mongodb+srv://salonikansal789:1234@cluster0.rkawwf3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=JXt57Ve8y

JWT_EXPIRES_IN=3600

COOKIE_NAME=auth_token

CSRF_COOKIE_NAME=_csrf

NODE_ENV=development

3. Then install globally nodemon before run npm run dev for backend
 - npm i -g nodemon

4. Run backend

   - npm run build
   - npm start

## Backend API will be run at:

http://localhost:4000/api/user


5. Seeded test users

## Automatically created on startup:

=> alice@example.com
  password123

=> bob@example.com
  secret321


🎨 Frontend Setup
1. Install dependencies

   - cd frontend
   - npm install

2. Run frontend

   - npm run dev
   
3.Frontend run at:

http://localhost:5173


## How it Works

1. CSRF Token

GET /api/user/csrf-token → returns { csrfToken } and sets _csrf cookie.

2. Login

POST /api/user/login with body { email, password }

Must send header: x-csrf-token: <token>

3. WhoAmI

GET /api/user/whoami

Requires JWT cookie + CSRF token header.

4. Logout

POST /api/user/logout

Requires CSRF token header → clears JWT cookie.



