<div align="center">

# Chatify

### Real-time messaging, built the right way.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

> A full-stack real-time chat application with JWT authentication, Socket.IO messaging, Cloudinary media uploads, and a cinematic dark UI inspired by CS2 skin aesthetics.

<!-- Replace with actual screenshot -->
![Chatify Preview](./preview.png)

</div>

---

## Overview

Chatify is a full-stack chat application built as a learning project to explore how real production-grade systems work end to end — from JWT refresh token rotation and HTTP-only cookie security, to Socket.IO event rooms, Cloudinary lifecycle management, and a component architecture that scales cleanly.

The stack was chosen deliberately:

- **Express over NestJS** — lower abstraction, every decision is explicit and visible
- **Mongoose over Prisma** — document modeling fits chat data naturally (messages embedded by reference, flexible schema)
- **Zustand over Redux** — chat UIs have frequent small state updates; Zustand's granular subscriptions prevent unnecessary re-renders without boilerplate
- **Tailwind v4 + DaisyUI v5** — the new CSS-first config approach removes the need for JS config files entirely, and DaisyUI v5 is built natively for it
- **Resend over SendGrid** — modern API, better DX, cleaner email templates with full HTML control

The UI takes visual inspiration from CS2 skin aesthetics — specifically the dark crimson/gold/purple palette of the AWP Prince — resulting in a cinematic dark theme that feels premium without being gaudy.

---

## Features

### Authentication
- Signup with email validation, username uniqueness check, and password hashing (bcryptjs, salt rounds 10)
- Login with credential verification and dual-token issuance
- Logout with server-side refresh token invalidation and cookie clearing
- Session persistence via `checkAuth` on every page load
- Protected routes on both frontend (Zustand guard) and backend (JWT middleware)

### Messaging
- Real-time 1-to-1 messaging via Socket.IO
- Conversation model automatically created on first message between two users
- Messages sorted chronologically, auto-scroll to latest
- Text and image messages supported
- Online/offline presence indicators

### Media
- Profile picture upload via Multer → Cloudinary pipeline
- Old profile picture automatically deleted from Cloudinary on update (no orphaned assets)
- Unique filenames generated server-side to prevent collisions

### User Management
- Contact list showing all registered users except yourself
- Chat list showing only existing conversations
- Clickable avatars to open conversations
- Profile picture update directly from the sidebar

### Security
- Access + refresh token architecture (15m / 7d)
- HTTP-only cookies — tokens never accessible via JavaScript
- `sameSite: strict` cookie policy
- Arcjet middleware for bot detection and rate limiting
- Passwords never returned in any API response (`select("-password")`)
- Cloudinary credentials never exposed to frontend

### UI / UX
- Cinematic dark theme (deep black, crimson glows, gold accents)
- Animated conic-gradient border on cards using CSS `@property` and `conic-gradient`
- Skeleton loading states for contacts, chats, and messages
- Toast notifications for all async actions
- Keyboard shortcut (Escape) to close active conversation
- Sound toggle with localStorage persistence
- Responsive sidebar layout

### Email
- Welcome email sent on signup via Resend
- Custom dark HTML email template with account info and security notice
- Non-blocking — email failure does not interrupt signup flow

---

## Screenshots

| Screen | Preview |
|--------|---------|
| Signup | ![Signup](./screenshots/signup.png) |
| Login | ![Login](./screenshots/login.png) |
| Chat View | ![Chat](./screenshots/chat.png) |
| Contact List | ![Contacts](./screenshots/contacts.png) |
| No Conversation | ![Empty](./screenshots/empty.png) |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI library |
| Vite | 8 | Build tool and dev server |
| Tailwind CSS | 4 | Utility-first styling |
| DaisyUI | 5 | Component primitives |
| Zustand | 5 | Global state management |
| Axios | 1.x | HTTP client with credential support |
| React Router | 8 | Client-side routing |
| Lucide React | latest | Icon library |
| React Hot Toast | 2.x | Toast notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ESM | Runtime |
| Express | 4 | HTTP server and routing |
| Mongoose | 8 | MongoDB ODM |
| Socket.IO | — | Real-time bidirectional events |
| JSON Web Token | 9 | Access and refresh token signing |
| bcryptjs | 2.x | Password hashing |
| Multer | 2.x | Multipart file handling |
| Cloudinary | 2.x | Media storage and CDN |
| Resend | 6.x | Transactional email |
| Arcjet | 1.x | Rate limiting and bot protection |
| cookie-parser | 1.x | HTTP cookie parsing |
| dotenv | 16 | Environment variable loading |
| CORS | 2.x | Cross-origin request control |

### Infrastructure

| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Database hosting |
| Cloudinary | Image storage and CDN delivery |
| Resend | Email delivery |

---

## Architecture

```
Browser (React)
      │
      │  HTTP (REST) + WebSocket (Socket.IO)
      ▼
┌─────────────────────────────────┐
│         Express Server           │
│                                  │
│  dotenv → env loaded first       │
│  cors   → origin whitelist       │
│  cookie-parser → token reading   │
│  express.json → body parsing     │
│                                  │
│  /api/auth   → auth.route.js     │
│  /api/messages → message.route   │
└────────────┬────────────────────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
auth.controller   message.controller
    │                 │
    │           ┌─────┴──────┐
    │           ▼            ▼
    │      Message.js   Conversation.js
    │           │
    ▼           ▼
User.js    MongoDB Atlas
    │
    ├── bcryptjs (password hashing)
    ├── JWT (token generation)
    └── Cloudinary (profile pic upload)
```

**Layers explained:**

- **Routes** — thin layer, only maps HTTP verbs to controller functions and chains middleware
- **Middleware** — `authMiddleware` verifies the access token on every protected route and attaches `req.user`; `multer` handles multipart uploads before the controller sees the request; `arcjet` runs security checks before any business logic
- **Controllers** — all business logic lives here; each function is wrapped in `asyncHandler` so errors propagate to Express without try/catch repetition
- **Models** — Mongoose schemas with pre-save hooks (password hashing), instance methods (token generation), and proper field-level validation
- **Utils** — `apiResponse` and `apiError` enforce a consistent response envelope across every endpoint; `setTokenCookies` centralizes cookie config so it can't drift between handlers

---

## Folder Structure

```
chatapp/
├── backend/
│   ├── app.js                    # Entry point, middleware stack, route mounting
│   ├── public/
│   │   └── temp/                 # Multer staging directory (cleared after upload)
│   └── src/
│       ├── config/
│       │   └── env.js            # dotenv loaded as first ESM import
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── message.controller.js
│       ├── db/
│       │   └── db.js             # Mongoose connection
│       ├── emails/
│       │   ├── emailHandlers.js  # Resend send functions
│       │   └── emailTemplate.js  # HTML email template
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   ├── arcjet.middleware.js
│       │   └── multer.middleware.js
│       ├── models/
│       │   ├── User.model.js
│       │   ├── conversation.model.js
│       │   └── message.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   └── message.route.js
│       └── utils/
│           ├── api.Error.js
│           ├── api.Response.js
│           ├── asyncHandler.js
│           ├── cloudinary.js
│           ├── resend.js
│           └── setTokenCookies.js
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx               # Root component, background, route guards
        ├── main.jsx              # React root, BrowserRouter
        ├── index.css             # Tailwind v4, DaisyUI, @property, @theme
        ├── components/
        │   ├── ActiveTabSwitch.jsx
        │   ├── BorderAnimatedContainer.jsx
        │   ├── ChatContainer.jsx
        │   ├── ChatHeader.jsx
        │   ├── ChatsList.jsx
        │   ├── ContactList.jsx
        │   ├── MessageInput.jsx
        │   ├── MessagesLoadingSkeleton.jsx
        │   ├── NoChatHistoryPlaceholder.jsx
        │   ├── NoChatsFound.jsx
        │   ├── NoConversationPlaceholder.jsx
        │   ├── PageLoader.jsx
        │   ├── ProfileHeader.jsx
        │   └── UsersLoadingSkeleton.jsx
        ├── lib/
        │   └── axios.js          # Axios instance with baseURL and credentials
        ├── pages/
        │   ├── chatPage.jsx
        │   ├── loginPage.jsx
        │   └── signupPage.jsx
        └── store/
            ├── useAuthStore.js
            └── useChatStore.js
```

---

## Authentication Flow

```
POST /api/auth/signup
        │
        ├── Validate fields (username, email, password)
        ├── Check email regex
        ├── Check duplicate user (email OR username)
        ├── Hash password (bcrypt, 10 rounds)
        ├── Create User document
        ├── Send welcome email via Resend (non-blocking)
        │
        ├── generateAccessAndRefreshToken(userId)
        │       ├── Sign access token  (JWT, 15m, ACCESS_TOKEN_SECRET)
        │       ├── Sign refresh token (JWT, 7d, REFRESH_TOKEN_SECRET)
        │       └── Save refresh token to User document
        │
        ├── Set HTTP-only cookies
        │       ├── accessToken  (maxAge: 15min)
        │       └── refreshToken (maxAge: 7d)
        │
        └── Return user object (no password, no refreshToken)

─────────────────────────────────────────────────────

On every page load → checkAuth()
        │
        ├── GET /api/auth/check
        ├── authMiddleware reads accessToken cookie
        ├── JWT.verify() with ACCESS_TOKEN_SECRET
        ├── User.findById(decodedToken._id)
        └── Set authUser in Zustand store

─────────────────────────────────────────────────────

POST /api/auth/logout
        │
        ├── Set refreshToken: null in database
        ├── clearCookie("accessToken")
        └── clearCookie("refreshToken")
```

The separation of access and refresh tokens matters: a leaked access token expires in 15 minutes. The refresh token lives in the database, so logout can invalidate it server-side even if somehow intercepted — something impossible with a stateless single-token system.

---

## Real-Time Messaging Flow

```
User opens conversation
        │
        ▼
getMessagesByUserId(userId)
        │
        ├── Find or confirm Conversation document
        └── Fetch all Messages where conversationId matches
                │
                ▼
        Messages rendered in ChatContainer
        Auto-scroll to bottom via useRef

        │
        ▼
subscribeToMessages() ← Socket.IO listener attached
        │
        └── On "newMessage" event → append to messages[]
                                  → trigger re-render

─────────────────────────────────────────────────────

User sends message
        │
        ▼
POST /api/messages/:receiverId
        │
        ├── Find or create Conversation (participants: [sender, receiver])
        ├── Create Message document
        ├── Update conversation.lastMessage
        └── Emit "newMessage" via Socket.IO to receiver's room
                │
                ▼
        Receiver's subscribeToMessages listener fires
        Message appended to UI without page refresh
```

---

## Media Upload Flow

```
User clicks profile picture → file input triggered
        │
        ▼
File selected (image/*)
        │
        ▼
FormData built in useAuthStore.updateProfile()
        │
        ▼
PUT /api/auth/update-profilePic
        │
        ▼
Multer middleware
        ├── Validates it's a file upload
        ├── Generates unique filename (timestamp + random)
        └── Saves to /public/temp/
        │
        ▼
uploadToCloudinary(req.file.path)
        ├── Cloudinary SDK uploads file
        ├── Temp file deleted from disk (fs.unlinkSync)
        └── Returns { secure_url, public_id, ... }
        │
        ▼
deleteFromCloudinary(oldPublicId)
        └── Previous profile picture removed from CDN
        │
        ▼
User.findByIdAndUpdate → profilePic = cloudinary.secure_url
        │
        ▼
Updated user returned → authUser updated in Zustand
        └── Profile picture in UI updates immediately
```

Deleting the old image before saving the new URL prevents orphaned assets accumulating in your Cloudinary account over time.

---

## State Management

Zustand was chosen over Redux for this project because chat UIs update in small, frequent bursts — a new message arrives, a user comes online, a loading flag flips. Redux's action/reducer cycle adds overhead that doesn't pay off at this scale. Zustand lets components subscribe to exactly the slice of state they need, so a message arriving doesn't re-render the contact list.

### `useAuthStore`

| State | Type | Purpose |
|-------|------|---------|
| `authUser` | object \| null | Logged-in user data |
| `isCheckingAuth` | boolean | Shows PageLoader during initial auth check |
| `isSigningUp` | boolean | Disables signup button during request |
| `isLoggingIn` | boolean | Disables login button during request |

Actions: `checkAuth`, `signup`, `login`, `logout`, `updateProfile`

### `useChatStore`

| State | Type | Purpose |
|-------|------|---------|
| `chats` | array | Existing conversations |
| `allContacts` | array | All users except self |
| `messages` | array | Messages in active conversation |
| `selectedUser` | object \| null | Currently open chat |
| `activeTab` | string | `"chats"` or `"contacts"` |
| `isUserLoading` | boolean | Skeleton state for lists |
| `isMessagesLoading` | boolean | Skeleton state for messages |
| `isSoundEnabled` | boolean | Persisted to localStorage |
| `onlineUsers` | array | Socket.IO presence list |

Actions: `getMyChats`, `getAllContacts`, `getMessagesByUserId`, `subscribeToMessages`, `unsubscribeFromMessages`, `setSelectedUser`, `setActiveTab`, `toggleSound`

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Create account |
| POST | `/login` | — | Authenticate and receive tokens |
| POST | `/logout` | ✓ | Invalidate session |
| PUT | `/update-profilePic` | ✓ | Upload new profile picture |
| GET | `/check` | ✓ | Verify active session |

### Messages — `/api/messages` (all protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts` | All users except self |
| GET | `/chats` | All existing conversations |
| GET | `/:id` | Messages with a specific user |
| POST | `/:id` | Send message to a specific user |

---

## Security

**Password storage** — bcrypt with 10 salt rounds. The hash is never returned in any response via Mongoose `.select("-password")`.

**JWT strategy** — Two tokens rather than one. The access token is short-lived (15 minutes) to limit the damage window of a leak. The refresh token is stored in the database, so it can be revoked server-side on logout — unlike a purely stateless approach where you'd have to wait for expiry.

**HTTP-only cookies** — Both tokens are stored in HTTP-only, SameSite=strict cookies. They cannot be read by JavaScript, eliminating the entire XSS token theft attack surface. The `secure` flag is toggled by `NODE_ENV` so it doesn't break local development over HTTP.

**Cloudinary cleanup** — Old profile pictures are deleted from Cloudinary before the new URL is saved. This prevents a subtle data exposure: if a user changes their picture and you had the old URL cached, it no longer resolves.

**Input validation** — All controller inputs are validated before any database operation. Email format is checked with a regex. Password length is enforced. Duplicate users checked atomically via `$or` query.

**Arcjet** — Bot detection and rate limiting middleware sits in front of routes to block automated abuse before it reaches business logic.

---

## Key Engineering Concepts

**`asyncHandler` wrapper** — Rather than wrapping every async controller in try/catch, a higher-order function catches thrown errors and passes them to Express's error middleware. This keeps controllers clean and error handling consistent.

**`apiResponse` / `apiError` envelope** — Every response follows the same shape `{ statusCode, data, message, success }`. Frontend code can rely on `res.data.data` for payload and `res.data.message` for user-facing text without defensive checks.

**ESM import hoisting and dotenv** — In Node.js ESM, all `import` statements are hoisted and resolved before any module body runs. This means `dotenv.config()` written after imports in `app.js` runs too late — by then, all imported modules have already initialized with `undefined` env vars. The fix: `env.js` is imported first and calls `dotenv.config()` as its only statement. Because it's the first import, it runs before anything else.

**Cloudinary config at call time** — For the same reason, `cloudinary.config()` was moved inside a `getCloudinary()` factory function called at upload time rather than at module load time. This ensures credentials are available when the upload actually happens.

**Socket.IO subscription cleanup** — `subscribeToMessages` attaches an event listener when a conversation is opened. `unsubscribeFromMessages` removes it when the component unmounts (useEffect cleanup). Without this, navigating between conversations stacks up duplicate listeners that fire multiple times per message.

**Zustand granular subscriptions** — Components subscribe to individual state slices (`state.messages`, `state.chats`) rather than the whole store. When messages update, only ChatContainer re-renders — ProfileHeader, ContactList, etc. are unaffected.

**Named Tailwind group variants** — The profile picture hover overlay uses `group/avatar` and `group-hover/avatar` rather than the default `group`. This scopes the hover trigger to exactly the avatar button and prevents parent containers from accidentally triggering the overlay.

---

## Performance

- **Skeleton loading** — `UsersLoadingSkeleton` and `MessagesLoadingSkeleton` render immediately while data fetches, preventing layout shift
- **Auto-scroll with `useRef`** — `messageEndRef.current.scrollIntoView` is called reactively on `messages` change rather than on a timer
- **Conditional rendering** — `ChatContainer` only mounts when `selectedUser` is non-null; Socket.IO subscriptions only exist when a conversation is open
- **Zustand slice subscriptions** — Components only re-render when their specific state slice changes
- **Cloudinary CDN** — Profile pictures are served via Cloudinary's global CDN, not from the Node.js server
- **Unique filenames** — Multer generates `timestamp-random.ext` filenames, preventing cache collision across users

---

## Installation

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Resend account

### Clone

```bash
git clone https://github.com/yourusername/chatify.git
cd chatify
```

### Backend

```bash
cd backend
npm install
```

Create `.env` (see Environment Variables below), then:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

---

## Environment Variables

Create `backend/.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/chatify

# Client
CLIENT_URL=http://localhost:5173

# Access Token
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
ACCESS_TOKEN_COOKIE_MAX_AGE=900000

# Refresh Token
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
REFRESH_TOKEN_COOKIE_MAX_AGE=604800000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=onboarding@yourdomain.com
EMAIL_FROM_NAME=Chatify

# Arcjet
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## Future Scope

- **Group chats** — The `Conversation` model already has `isGroup`, `groupName`, `groupImage`, and `groupAdmin` fields; the backend logic just needs to be implemented
- **Read receipts** — `isSeen` field exists on `Message` model, needs Socket.IO event to sync across clients
- **Typing indicators** — Socket.IO `typing` / `stopTyping` events
- **Message reactions** — Emoji reactions stored as a sub-document array on Message
- **Message search** — MongoDB text index on `message.text`
- **Voice / video calls** — WebRTC peer connection brokered via Socket.IO signaling
- **Push notifications** — Web Push API with service worker
- **PWA** — Manifest and service worker for offline support
- **Infinite scroll** — Paginated message loading with cursor-based pagination
- **Docker + CI/CD** — Containerized deployment with GitHub Actions
- **Test coverage** — Vitest (frontend) + Jest/Supertest (backend)

---

## Challenges

**ESM and dotenv timing** — The most subtle bug in the project. Node.js ESM hoists all import resolution before any module body runs, which means `dotenv.config()` called in `app.js` was simply too late — every downstream module had already read `undefined` from `process.env`. Solved by making `env.js` the first import, ensuring dotenv runs before any other module initializes.

**Cloudinary 403 errors** — Credentials were loading correctly, but the Cloudinary SDK was initialized at module-load time before dotenv had run. Moving `cloudinary.config()` into a factory function called at upload time resolved this cleanly.

**Cookie visibility in Postman** — HTTP-only cookies with `secure: true` are silently dropped over plain HTTP. Took time to trace this to `NODE_ENV` not being set correctly in the dev environment, causing the secure flag to be true even on localhost.

**Profile picture hover scope** — Tailwind's `group` / `group-hover` mechanism doesn't scope to a single element — any ancestor with `group` can trigger `group-hover` descendants. The fix was named group variants (`group/avatar`) introduced in Tailwind v3.2, which scope hover triggers to a specific named group.

**DaisyUI theme overrides** — DaisyUI v5 injects its own background colors on `body` via theme variables, which overwrote the custom `#0c0608` background. Locking the background in `@layer base` with direct hex values gave it enough specificity to win the cascade.

---

## What I Learned

Building Chatify pushed me into parts of the stack I'd read about but never debugged under real conditions. The dotenv/ESM timing issue was genuinely surprising — it's the kind of thing that looks like a credentials problem on the surface but is actually a module initialization order problem. That pattern of "it looks like X but is actually Y" is what separates debugging experience from theoretical knowledge.

Working with Socket.IO taught me how easy it is to introduce memory leaks through unmanaged event listeners, and how React's `useEffect` cleanup function is exactly the right place to handle teardown — not an afterthought.

The dual-token auth architecture forced me to think about the difference between *authentication* and *session management*. A JWT proves who you are. A refresh token in the database controls whether you're *allowed* to still be logged in. They solve different problems.

On the frontend, Zustand's subscription model made me think about component responsibility more carefully. When a component subscribes to `state.messages`, it's making a contract: "I only need to re-render when messages change." Keeping that contract tight is what makes the UI feel responsive.

---

## Contributing

Contributions are welcome. If you're fixing a bug, open an issue first to confirm it's reproducible. For new features, check the Future Scope section — anything listed there is fair game.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a pull request
```

Please keep PRs focused — one concern per PR makes review faster and merges cleaner.

---

## License

MIT — do whatever you want, just don't remove the license header.

---

## Author

Built by **Vaibhav Khandelwal**

| | |
|--|--|
| GitHub | [@yourusername](https://github.com/yourusername) |
| LinkedIn | [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile) |
| Portfolio | [yourportfolio.dev](https://yourportfolio.dev) |
| Email | your@email.com |

---

<div align="center">
  <sub>If this project helped you learn something, a ⭐ is always appreciated.</sub>
</div>
