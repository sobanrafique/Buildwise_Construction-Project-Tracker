# Buildwise Construction Project Tracker

A full-stack construction project management system built with React, Node.js, and MongoDB Atlas.

## Tech Stack

- **Frontend**: React 18 with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas (Cloud Database)
- **Authentication**: JWT (JSON Web Tokens)

## Features

### Worker Features
- View assigned tasks
- Update task status and progress
- Filter tasks by status
- Search tasks

### Client Features
- View assigned projects
- View project details and status
- Track project progress

### Admin/Manager Features
- Create and manage tasks
- Create and manage projects
- Assign tasks to workers
- Full CRUD operations

## Project Structure

```
Buildwise_Construction-Project-Tracker/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/        # React contexts (Auth, Toast)
│       ├── pages/          # Page components
│       ├── services/       # API service
│       └── App.js          # Main app component
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

4. Create a `.env` file in the `server` directory with the following content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://my_team:YOUR_PASSWORD@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority&appName=Fsd
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```
   
   **Important**: 
   - Replace `YOUR_PASSWORD` with your actual MongoDB database password
   - Make sure your IP address is whitelisted in MongoDB Atlas Network Access
   - See `server/MONGODB_SETUP.md` for detailed setup instructions

5. Update `JWT_SECRET` with a strong random string

6. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## MongoDB Atlas Setup

1. **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up

2. **Create a Cluster**: 
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)

4. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add specific IP addresses

5. **Get Connection String**:
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `buildwise` (or your preferred database name)

6. **Update .env file** with the connection string

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks (role-scoped)
- `GET /tasks/:id` - Get single task
- `POST /tasks` - Create task (admin/manager only)
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task (admin/manager only)

### Projects
- `GET /projects` - Get all projects (role-scoped)
- `GET /projects/:id` - Get single project
- `POST /projects` - Create project (admin/manager only)
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project (admin only)

### Users
- `GET /users` - Get users (for task assignment)

## Environment Variables

### Server (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Client (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000)

## Role-Based Access Control

- **Admin**: Full access to all features
- **Project Manager**: Can create/manage projects and tasks
- **Site Worker**: Can view and update assigned tasks (status/progress only)
- **Client**: Can view their own projects and project status

## Development

### Running Both Frontend and Backend

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

## Production Deployment

1. Build the React app:
```bash
cd client
npm run build
```

2. Set production environment variables

3. Deploy backend to a Node.js hosting service (Heroku, Railway, etc.)

4. Deploy frontend to a static hosting service (Vercel, Netlify, etc.)

## License

ISC

