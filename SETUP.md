# Quick Setup Guide

## MongoDB Atlas Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Free Cluster
1. Click "Build a Database"
2. Choose **FREE** (M0) tier
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., `buildwise_user`)
5. Generate a secure password (save it!)
6. Set privileges to "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<username>` with your database username
6. Replace `<password>` with your database password
7. Add database name: Replace `?` with `/buildwise?`
   - Final: `mongodb+srv://buildwise_user:yourpassword@cluster0.xxxxx.mongodb.net/buildwise?retryWrites=true&w=majority`

## Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Copy the example and edit it
cp .env.example .env

# Edit .env file and add your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buildwise?retryWrites=true&w=majority

# Start the server
npm run dev
```

## Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
# Create a file named .env with:
# REACT_APP_API_URL=http://localhost:5000

# Start the development server
npm start
```

## Testing the Connection

1. Start the backend server - you should see:
   ```
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   Server listening on port 5000
   ```

2. If you see "MongoDB Connected", your database connection is working!

3. Start the frontend - it should open at http://localhost:3000

## Troubleshooting

### MongoDB Connection Error
- Check your connection string format
- Verify username and password are correct
- Make sure IP address is whitelisted
- Check if cluster is fully created (green status)

### Port Already in Use
- Change PORT in server/.env file
- Or kill the process using the port

### CORS Errors
- Make sure backend is running
- Check REACT_APP_API_URL in client/.env

