// Basic Express server setup with mounted route groups
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const workerRoutes = require('./routes/workerRoutes');

// Load environment variables
dotenv.config();

const app = express();

// CORS middleware - Allow React frontend to connect
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/worker', workerRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;

if (require.main === module) {
  // Connect to MongoDB Atlas
  connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

