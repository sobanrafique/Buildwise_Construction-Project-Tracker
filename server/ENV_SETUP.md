# Environment Variables Setup

## Create .env File

In the `server` directory, create a file named `.env` (no extension) with the following content:

```env
MONGO_URI=mongodb+srv://my_team:<db_password>@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority
PORT=5000
```

## Important Notes:

1. **Replace `<db_password>`** with your actual MongoDB Atlas database password for the `my_team` user
2. The connection string includes `/buildwise` as the database name
3. Make sure your MongoDB Atlas cluster allows connections from your IP address (Network Access settings)

## Example:

If your password is `MySecurePassword123`, your `.env` file should look like:

```env
MONGO_URI=mongodb+srv://my_team:MySecurePassword123@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority
PORT=5000
```

## Install MongoDB Driver

The `mongodb` package is already added to `package.json`. Run:

```bash
cd server
npm install
```

This will install all dependencies including:
- `mongodb` - MongoDB native driver
- `mongoose` - MongoDB ODM (Object Data Modeling)
- All other required packages

## Verify Connection

After setting up the `.env` file and installing dependencies, start the server:

```bash
npm start
```

You should see:
```
MongoDB Atlas Connected: fsd.6suemfy.mongodb.net
Server listening on port 5000
```

