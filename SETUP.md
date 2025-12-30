# Buildwise Construction Project Tracker - Setup Guide

## MongoDB Atlas Integration

This project uses **MongoDB Atlas** (cloud MongoDB) for the backend database and **React** for the frontend.

---

## Backend Setup (Node.js + MongoDB Atlas)

### Step 1: Install Dependencies

```bash
cd server
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables

### Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, use specific IP addresses only
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`

### Step 3: Create .env File

In the `server` directory, create a `.env` file:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER_URL/buildwise?retryWrites=true&w=majority
PORT=5000
```

**Replace**:
- `YOUR_USERNAME` - Your MongoDB Atlas database username
- `YOUR_PASSWORD` - Your MongoDB Atlas database password
- `YOUR_CLUSTER_URL` - Your cluster URL (e.g., `cluster0.xxxxx.mongodb.net`)

**Example**:
```env
MONGO_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/buildwise?retryWrites=true&w=majority
PORT=5000
```

### Step 4: Run the Server

```bash
cd server
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
MongoDB Atlas Connected: cluster0.xxxxx.mongodb.net
Server listening on port 5000
```

---

## Frontend Setup (React)

### Step 1: Install Dependencies

```bash
cd client
npm install
```

### Step 2: Configure API URL (Optional)

The frontend is configured to connect to `http://localhost:5000` by default.

To change the API URL, create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

For production, set this to your backend server URL.

### Step 3: Run the Frontend

```bash
cd client
npm start
```

The React app will open at `http://localhost:3000`

---

## Project Structure

```
Buildwise_Construction-Project-Tracker/
├── server/
│   ├── config/
│   │   └── db.js              # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── managerController.js
│   │   └── workerController.js
│   ├── models/
│   │   └── User.js            # User model with MongoDB/Mongoose
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── managerRoutes.js
│   │   └── workerRoutes.js
│   ├── server.js              # Express server + MongoDB connection
│   ├── package.json
│   └── .env                   # MongoDB Atlas connection string (create this)
│
└── client/
    ├── src/
    │   ├── config/
    │   │   └── api.js         # API endpoint configuration
    │   ├── pages/
    │   │   ├── Admin/
    │   │   ├── Manager/
    │   │   └── Worker/
    │   └── App.js
    └── package.json
```

---

## Testing the Connection

1. **Start the backend server** (port 5000)
2. **Start the frontend** (port 3000)
3. **Navigate to** `http://localhost:3000/admin`
4. **Try creating a user** - If MongoDB Atlas is connected, the user will be saved to the cloud database!

---

## Troubleshooting

### MongoDB Atlas Connection Issues

- **Error: "authentication failed"**
  - Check your username and password in the `.env` file
  - Make sure you URL-encoded special characters in the password

- **Error: "IP not whitelisted"**
  - Go to MongoDB Atlas → Network Access
  - Add your current IP address or use `0.0.0.0/0` for development

- **Error: "connection timeout"**
  - Check your internet connection
  - Verify the cluster is running in MongoDB Atlas
  - Make sure the connection string is correct

### Frontend Can't Connect to Backend

- Make sure the backend server is running on port 5000
- Check that `REACT_APP_API_URL` in client `.env` matches your backend URL
- Check browser console for CORS errors (may need to add CORS middleware)

---

## Next Steps

- Implement authentication (JWT tokens)
- Add more features for Manager and Worker dashboards
- Deploy to production (Heroku, Vercel, etc.)

