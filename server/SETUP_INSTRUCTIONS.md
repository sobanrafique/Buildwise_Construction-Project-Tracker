# Quick Setup Instructions

## Step 1: Create .env File

You have two options:

### Option A: Use the Batch Script (Windows)
Double-click `create-env.bat` in the server folder. Then edit the `.env` file and replace `<db_password>` with your actual password.

### Option B: Manual Creation
1. In the `server` directory, create a new file named `.env` (no extension)
2. Copy and paste this content:

```env
# MongoDB Atlas Connection String
# IMPORTANT: Replace <db_password> with your actual MongoDB Atlas password for the 'my_team' user
MONGO_URI=mongodb+srv://my_team:<db_password>@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority

# Server Port
PORT=5000
```

3. Replace `<db_password>` with your actual MongoDB Atlas password

**Example:** If your password is `MyPassword123`, the line should be:
```
MONGO_URI=mongodb+srv://my_team:MyPassword123@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority
```

## Step 2: Install Dependencies

Open a terminal/command prompt in the `server` directory and run:

```bash
npm install
```

This will install:
- ✅ `mongodb` - MongoDB native driver
- ✅ `mongoose` - MongoDB ODM
- ✅ `express` - Web framework
- ✅ `bcryptjs` - Password hashing
- ✅ `dotenv` - Environment variables
- ✅ `cors` - CORS middleware
- ✅ `jsonwebtoken` - JWT authentication
- ✅ `nodemon` - Development auto-reload

## Step 3: Verify Setup

After installing dependencies and creating the `.env` file with your password, start the server:

```bash
npm start
```

You should see:
```
MongoDB Atlas Connected: fsd.6suemfy.mongodb.net
Server listening on port 5000
```

If you see this, everything is working! ✅

## Troubleshooting

### npm is not recognized
- Make sure Node.js is installed: https://nodejs.org/
- Restart your terminal after installing Node.js
- Verify installation: `node --version` and `npm --version`

### MongoDB Connection Error
- Double-check your password in the `.env` file
- Make sure you replaced `<db_password>` with your actual password
- Verify your IP is whitelisted in MongoDB Atlas Network Access
- Check that your cluster is running (green status in MongoDB Atlas)

### Port Already in Use
- Change `PORT=5000` to a different port (e.g., `PORT=5001`) in your `.env` file
- Or stop the process using port 5000

