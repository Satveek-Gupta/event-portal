# 🎟️ Event Portal

A **full-stack web application** built to simplify **event registrations** and **attendee management** for university clubs.  
The platform features a sleek **React + TypeScript frontend** and a **Node.js + Express backend** integrated with **Supabase**.

---

## 🚀 Features

- 🎫 **Event Registration** – Seamless event sign-ups with validation  
- 👥 **Attendee Management** – View and manage all registered users  
- 🌙 **Dark Mode** – Modern light/dark theme toggle  
- 📱 **Responsive UI** – Tailwind-powered mobile-friendly design  
- 🔒 **Email Validation** – Prevent duplicate and invalid entries  
- 💾 **Supabase Storage** – Reliable and scalable cloud database

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 19** – Component-based UI  
- 🟦 **TypeScript** – Static typing and maintainability  
- ⚡ **Vite** – Lightning-fast dev and build tool  
- 🎨 **Tailwind CSS** – Utility-first responsive design  
- 🔗 **React Router** – Client-side routing

### Backend
- 🟩 **Node.js** – Server runtime  
- 🚏 **Express 5** – Minimal and flexible web framework  
- 🔐 **dotenv** – Environment variable management  
- 🌐 **CORS** – Cross-origin resource sharing  
- 🗄️ **Supabase** – Database and backend-as-a-service

---

## 📁 Project Structure

```
event-portal/
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # Pages (Home, Register, Attendees)
│   │   ├── api.ts        # API functions
│   │   └── types.ts      # Type definitions
│   └── dist/             # Production build
└── server/               # Express backend
├── api/              # API routes
│   ├── register.js
│   └── attendees.js
├── utils/            # Utility files
│   └── data.js
└── index.js          # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-portal
```

2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:

```bash
# Copy example env files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit the `.env` files as needed (see [Environment Variables](#environment-variables) section below).

### Development

#### Running the Server

From the `server` directory:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:3001` by default (or the port specified in the `PORT` environment variable).

#### Running the Client

From the `client` directory:

```bash
npm run dev
```

The client will run on `http://localhost:5173` (or another port if 5173 is occupied).

### Production Build

1. Build the client:
```bash
cd client
npm run build
```

2. Set the `NODE_ENV` environment variable to `production`:
```bash
export NODE_ENV=production
```

3. Start the server (it will serve the built client):
```bash
cd server
npm start
```

In production mode, the server will serve the static files from `client/dist` and handle all routes.

## API Endpoints

### GET `/api/attendees`
Retrieves all registered attendees.

**Response:**
```json
[
  {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    "club": "Computer Science Club",
    "role": "Student",
    "comments": "Looking forward to the event!",
    "registeredAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST `/api/register`
Registers a new attendee.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "club": "Computer Science Club",
  "role": "Student",
  "comments": "Optional comments"
}
```

**Response:**
- `201 Created` - Registration successful
- `400 Bad Request` - Missing required fields or invalid email
- `409 Conflict` - Email already registered

## Environment Variables

### Server Environment Variables

Create a `.env` file in the `server/` directory (copy from `server/.env.example`):

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (`development` or `production`)
- `MONGODB_URI` - MongoDB connection string (required)

The server uses `dotenv` to load these variables automatically.


### Client Environment Variables

Create a `.env` file in the `client/` directory (copy from `client/.env.example`):

- `VITE_API_BASE_URL` - API base URL (leave empty for relative paths, or set to full URL like `http://localhost:3001`)

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to client code. Access them using `import.meta.env.VITE_*`.

## Scripts

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

