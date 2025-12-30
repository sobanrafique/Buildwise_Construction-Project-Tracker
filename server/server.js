// Basic Express server setup with mounted route groups
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const workerRoutes = require('./routes/workerRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/worker', workerRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  // Connect to MongoDB Atlas before starting server
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
}
