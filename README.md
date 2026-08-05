# Chatify

## Overview

Chatify is a full-stack real-time chat application built with React, Node.js, MongoDB, and Socket.IO. The project focuses on secure authentication, real-time messaging, media management, and a clean component-driven frontend architecture.

The backend provides REST APIs for user authentication, profile management, and messaging, while Socket.IO handles real-time event delivery. The frontend is built with React 19, Zustand for state management, and Tailwind CSS v4 with a custom dark theme.

Repository: https://github.com/yourusername/chatify

---

## Features

### Authentication
- User Signup with email validation and duplicate detection
- User Login with bcrypt password verification
- JWT Access Token + Refresh Token architecture
- HTTP-Only Cookie session management
- Protected routes on frontend and backend
- Session persistence via `checkAuth` on page load
- Logout with server-side refresh token invalidation

### User Management
- Update profile picture
- Old profile picture automatically deleted from Cloudinary on update
- View online/offline status of contacts

### Messaging
- Real-time 1-to-1 messaging via Socket.IO
- Conversation auto-created on first message
- Text and image message support
- Online presence indicators
- Auto-scroll to latest message

### UI / UX
- Cinematic dark theme (deep black, crimson glows, gold accents)
- Animated conic-gradient border using CSS `@property`
- Skeleton loading states for contacts, chats, and messages
- Toast notifications for all async actions
- Sound toggle with localStorage persistence
- Keyboard shortcut (Escape) to close active conversation

### Email
- Welcome email sent on signup via Resend
- Non-blocking — email failure does not interrupt signup

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS v4, DaisyUI v5 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Real-Time | Socket.IO |
| Authentication | JWT, bcryptjs |
| State Management | Zustand |
| Media Storage | Cloudinary, Multer |
| Email | Resend |
| Security | Arcjet (rate limiting, bot detection) |
| HTTP Client | Axios |

---

## Project Structure

```
chatapp/
├── backend/
│   ├── app.js
│   ├── public/temp/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── db/
│       ├── emails/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── utils/
│
└── frontend/
    └── src/
        ├── components/
        ├── lib/
        ├── pages/
        └── store/
```

---

## Architecture

The project follows MVC architecture on the backend and a store-driven component architecture on the frontend.

```
Browser (React + Zustand)
           │
           │  REST + WebSocket
           ▼
     Express Server
           │
    ┌──────┴──────┐
    ▼             ▼
Controllers    Socket.IO
    │
    ├── MongoDB (Mongoose)
    └── Cloudinary (Media)
```

---

## Authentication Flow

```
Signup / Login
    │
    ├── Validate input
    ├── Hash password (bcrypt, 10 rounds)
    ├── Generate access token  (JWT, 15m)
    ├── Generate refresh token (JWT, 7d)
    ├── Save refresh token to database
    └── Set HTTP-only cookies
            │
            ▼
    On page load → checkAuth()
            │
            ├── Verify access token from cookie
            ├── Fetch user from database
            └── Hydrate Zustand store

    Logout
            │
            ├── Nullify refresh token in database
            └── Clear both cookies
```

---

## Media Upload Flow

```
User selects image
    │
    ▼
FormData sent to backend
    │
    ▼
Multer (disk storage, unique filename)
    │
    ▼
uploadToCloudinary(localPath)
    ├── Upload to Cloudinary
    └── Delete temp file from disk
    │
    ▼
deleteFromCloudinary(oldPublicId)
    └── Remove previous picture from CDN
    │
    ▼
Save new URL to database
    └── Return updated user → Zustand updates UI
```

---

## API Modules

| Module | Base Route | Description |
|--------|-----------|-------------|
| Auth | `/api/auth` | Signup, login, logout, profile pic, checkAuth |
| Messages | `/api/messages` | Contacts, chats, message history, send message |

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Create account |
| POST | `/login` | — | Authenticate user |
| POST | `/logout` | ✓ | End session |
| PUT | `/update-profilePic` | ✓ | Upload new profile picture |
| GET | `/check` | ✓ | Verify active session |

### Message Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/contacts` | ✓ | All users except self |
| GET | `/chats` | ✓ | Existing conversations |
| GET | `/:id` | ✓ | Message history with user |
| POST | `/:id` | ✓ | Send message to user |

---

## Security

- Password hashing with bcrypt (salt rounds: 10)
- JWT access + refresh token pair — short access token limits leak damage window
- Refresh token stored in database — can be invalidated server-side on logout
- HTTP-only, SameSite=strict cookies — tokens inaccessible to JavaScript
- `secure` flag toggled by `NODE_ENV` — works on localhost without HTTPS
- Passwords and refresh tokens excluded from all API responses
- Cloudinary cleanup on profile picture update — no orphaned assets
- Arcjet middleware — rate limiting and bot detection before business logic

---

## Installation

**Clone**
```bash
git clone https://github.com/yourusername/chatify.git
cd chatify
```

**Backend**
```bash
cd backend
npm install
# create .env (see below)
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/chatify
CLIENT_URL=http://localhost:5173

ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRES_IN=15m
ACCESS_TOKEN_COOKIE_MAX_AGE=900000

REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRES_IN=7d
REFRESH_TOKEN_COOKIE_MAX_AGE=604800000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RESEND_API_KEY=re_your_key
EMAIL_FROM=onboarding@yourdomain.com
EMAIL_FROM_NAME=Chatify

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## What I Learned

Through this project I gained practical experience in:

- Building secure authentication using JWT access and refresh tokens stored in HTTP-only cookies
- Understanding why ESM import hoisting requires dotenv to be loaded as the first import, not inline
- Designing a dual-token auth system where server-side revocation is possible at logout
- Implementing real-time messaging with Socket.IO and managing event listener cleanup to prevent memory leaks
- Handling multipart file uploads through Multer and Cloudinary, including lifecycle management of old assets
- Structuring a React application with Zustand stores and granular subscriptions to avoid unnecessary re-renders
- Building a cinematic UI using Tailwind CSS v4, CSS `@property`, and conic-gradients for animated borders

---

## Future Improvements

- Group chat support (Conversation model already scaffolded with `isGroup`, `groupName`, `groupAdmin`)
- Read receipts (`isSeen` field already exists on Message model)
- Typing indicators
- Message reactions
- Message search
- Voice / video calling via WebRTC
- Push notifications
- Infinite scroll with cursor-based pagination
- Docker support
- CI/CD pipeline
- Automated testing
- Swagger API documentation

---

## Author

**Vaibhav Khandelwal**
GitHub: https://github.com/VaibhavKhandelwal-git

---

## License

This project is intended for educational purposes and to demonstrate full-stack development concepts using the MERN stack with real-time communication.
