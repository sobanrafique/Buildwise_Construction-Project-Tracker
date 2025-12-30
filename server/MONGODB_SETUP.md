# MongoDB Atlas Connection Setup

## Connection String

Your MongoDB Atlas connection string is:
```
mongodb+srv://my_team:<db_password>@fsd.6suemfy.mongodb.net/?appName=Fsd
```

## Steps to Configure

1. **Create `.env` file** in the `server` directory:
   ```bash
   cd server
   # Create .env file manually or copy from example
   ```

2. **Add the connection string to `.env`**:
   ```env
   MONGODB_URI=mongodb+srv://my_team:YOUR_PASSWORD@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority&appName=Fsd
   ```

3. **Important**: 
   - Replace `YOUR_PASSWORD` with your actual database password
   - Replace `buildwise` with your preferred database name (or keep it as `buildwise`)
   - Make sure your IP address is whitelisted in MongoDB Atlas Network Access

4. **Add other required environment variables**:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://my_team:YOUR_PASSWORD@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority&appName=Fsd
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

## Testing the Connection

After setting up your `.env` file, start the server:
```bash
npm run dev
```

You should see:
```
MongoDB Atlas Connected: fsd.6suemfy.mongodb.net
Database: buildwise
Server listening on port 5000
```

## Troubleshooting

- **Connection Error**: Check that your password is correct and IP is whitelisted
- **Authentication Failed**: Verify username (`my_team`) and password
- **Network Error**: Ensure your IP address is added to MongoDB Atlas Network Access

