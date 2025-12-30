# 🚀 Quick Start Guide

## ✅ What's Already Done

1. ✅ `mongodb` package added to `package.json`
2. ✅ MongoDB Atlas connection string configured
3. ✅ Setup scripts created

## 📋 What You Need to Do

### Step 1: Install Node.js (if not installed)

If you see "npm is not recognized", you need to install Node.js:

1. Download Node.js from: https://nodejs.org/
2. Install it (includes npm)
3. **Restart your terminal/command prompt**
4. Verify: `node --version` and `npm --version`

### Step 2: Create .env File

**Option A: Use the Script (Easiest)**
- **Windows**: Double-click `create-env.bat`
- **PowerShell**: Right-click `create-env.ps1` → Run with PowerShell

**Option B: Manual**
1. In the `server` folder, create a file named `.env`
2. Copy this content:

```env
MONGO_URI=mongodb+srv://my_team:YOUR_PASSWORD_HERE@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority
PORT=5000
```

3. Replace `YOUR_PASSWORD_HERE` with your actual MongoDB Atlas password

### Step 3: Install Dependencies

Open terminal in the `server` folder and run:

```bash
npm install
```

This installs all packages including:
- mongodb (MongoDB driver)
- mongoose (MongoDB ODM)
- express, cors, bcryptjs, jsonwebtoken, dotenv, nodemon

### Step 4: Start the Server

```bash
npm start
```

**Expected Output:**
```
MongoDB Atlas Connected: fsd.6suemfy.mongodb.net
Server listening on port 5000
```

✅ If you see this, you're all set!

## 🔧 Troubleshooting

### "npm is not recognized"
→ Install Node.js from https://nodejs.org/ and restart terminal

### "MongoDB connection error"
→ Check your password in `.env` file
→ Verify IP is whitelisted in MongoDB Atlas (Network Access)

### "Port 5000 already in use"
→ Change `PORT=5001` in `.env` file

## 📁 Files Created

- `create-env.bat` - Windows batch script to create .env
- `create-env.ps1` - PowerShell script to create .env
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide
- `ENV_SETUP.md` - Environment variable documentation

## 🎯 Next Steps After Setup

1. Start the backend: `npm start` (in server folder)
2. Start the frontend: `npm start` (in client folder)
3. Open browser: http://localhost:3000/admin

