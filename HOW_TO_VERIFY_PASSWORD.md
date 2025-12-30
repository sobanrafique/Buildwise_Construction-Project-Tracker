# How to Verify MongoDB Password in MongoDB Atlas

## Method 1: Check Existing User Password

Unfortunately, MongoDB Atlas doesn't show existing passwords for security reasons. You can only:
- **Reset the password** (recommended)
- **Create a new user** with a known password

## Method 2: Reset Password (Recommended)

### Step-by-Step Instructions:

1. **Go to MongoDB Atlas:**
   - Open your browser and go to: https://cloud.mongodb.com
   - Log in to your account

2. **Navigate to Database Access:**
   - Click on **"Database Access"** in the left sidebar
   - (It's under the "Security" section)

3. **Find Your User:**
   - Look for the user `my_team` in the list
   - If you don't see `my_team`, you may need to create it

4. **Reset Password:**
   - Click on the **"Edit"** button (pencil icon) next to `my_team` user
   - OR click on the user name to open details
   - Click **"Edit Password"** or **"Reset Password"**
   - Enter a new password: `1qwert0`
   - Click **"Update User"** or **"Save"**

5. **Verify User Permissions:**
   - Make sure the user has:
     - **Built-in Role:** "Read and write to any database"
     - OR at minimum: "Read and write" permissions

## Method 3: Create New User (If `my_team` Doesn't Exist)

1. **Go to Database Access:**
   - Click **"Add New Database User"** button

2. **Authentication Method:**
   - Select **"Password"** (not Certificate)

3. **User Details:**
   - **Username:** `my_team`
   - **Password:** `1qwert0`
   - Click **"Autogenerate Secure Password"** if you want, or enter `1qwert0` manually

4. **User Privileges:**
   - Select **"Built-in Role"**
   - Choose: **"Read and write to any database"**
   - (This gives full access to all databases)

5. **Create User:**
   - Click **"Add User"** button
   - **IMPORTANT:** Save the password somewhere safe (you won't see it again)

## Method 4: Test Connection with Current Password

After setting/resetting the password, test it:

1. **Update your `.env` file** (already done):
   ```
   MONGODB_URI=mongodb+srv://my_team:1qwert0@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority&appName=Fsd
   ```

2. **Test Connection:**
   ```bash
   cd server
   node server.js
   ```

3. **Expected Output (Success):**
   ```
   MongoDB Atlas Connected: fsd.6suemfy.mongodb.net
   Database: buildwise
   Server listening on port 5000
   ```

## Quick Visual Guide

```
MongoDB Atlas Dashboard
├── Security (Left Sidebar)
│   ├── Database Access ← Click here
│   │   ├── Find user: "my_team"
│   │   ├── Click "Edit" (pencil icon)
│   │   ├── Click "Edit Password"
│   │   ├── Enter: 1qwert0
│   │   └── Click "Update User"
│   │
│   └── Network Access ← Also check this!
│       ├── Click "Add IP Address"
│       └── Click "Allow Access from Anywhere" (0.0.0.0/0)
│
└── Clusters (Left Sidebar)
    └── Verify "Fsd" cluster is running (green status)
```

## Common Issues

### Issue 1: User Doesn't Exist
**Solution:** Create new user `my_team` with password `1qwert0`

### Issue 2: Password Doesn't Match
**Solution:** Reset password to `1qwert0` in Database Access

### Issue 3: IP Not Whitelisted
**Solution:** Go to Network Access → Add IP Address → Allow from Anywhere

### Issue 4: User Has Wrong Permissions
**Solution:** Edit user → Change role to "Read and write to any database"

## After Verifying/Resetting Password

1. **Make sure `.env` file has correct password:**
   ```env
   MONGODB_URI=mongodb+srv://my_team:1qwert0@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority&appName=Fsd
   ```

2. **Test the connection:**
   ```bash
   cd server
   node server.js
   ```

3. **If successful, you'll see:**
   ```
   ✅ MongoDB Atlas Connected: fsd.6suemfy.mongodb.net
   ✅ Database: buildwise
   ✅ Server listening on port 5000
   ```

## Need Help?

If you're still having issues:
1. Check `CONNECTION_STATUS.md` for detailed troubleshooting
2. Verify cluster name is "Fsd" (case-sensitive)
3. Make sure cluster is running (not paused)
4. Wait 1-2 minutes after changing password/IP whitelist

