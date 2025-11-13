# Event Portal

A full-stack web application for managing event registrations for university clubs. This project features a modern React frontend with TypeScript and a Node.js/Express backend.

## Features

- 🎫 **Event Registration**: Users can register for events with their details
- 👥 **Attendee Management**: View all registered attendees
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS
- 🔒 **Email Validation**: Server-side email validation and duplicate prevention
- 💾 **JSON Storage**: Simple file-based storage for attendees data

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

## Project Structure

```
event-portal/
├── client/          # React frontend application
│   ├── src/
│   │   ├── pages/   # Page components (Home, Registration, Attendees)
│   │   ├── api.ts   # API client functions
│   │   └── types.ts # TypeScript type definitions
│   └── dist/        # Production build output
└── server/          # Express backend server
    ├── index.js     # Main server file
    └── attendees.json # Data storage (auto-generated)
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

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (`development` or `production`)

## Scripts

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Data Storage

Attendee data is stored in `server/attendees.json`. This file is automatically created if it doesn't exist. For production use, consider migrating to a proper database (PostgreSQL, MongoDB, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

