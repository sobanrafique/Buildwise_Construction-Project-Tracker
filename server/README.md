# Buildwise Server Setup

## MongoDB Atlas Configuration

This server uses MongoDB Atlas (cloud MongoDB) for database storage.

### Setup Steps:

1. **Create a MongoDB Atlas Account** (if you don't have one):
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**:
   - Create a new cluster (free tier is fine)
   - Choose your preferred region

3. **Get Your Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)

4. **Create a Database User**:
   - In MongoDB Atlas, go to "Database Access"
   - Create a new database user with a username and password
   - Note: You'll need to replace `<username>` and `<password>` in the connection string

5. **Configure Network Access**:
   - Go to "Network Access" in MongoDB Atlas
   - Add your IP address (or use `0.0.0.0/0` for development - **NOT recommended for production**)

6. **Create .env File**:
   - In the `server` directory, create a `.env` file
   - Add the following:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/buildwise?retryWrites=true&w=majority
   PORT=5000
   ```
   - Replace `<username>`, `<password>`, and `<cluster-url>` with your actual MongoDB Atlas credentials

### Install Dependencies

```bash
cd server
npm install
```

### Run the Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will connect to MongoDB Atlas on startup and you'll see: `MongoDB Atlas Connected: ...`

