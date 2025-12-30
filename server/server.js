// Basic Express server setup with mounted route groups
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const workerRoutes = require('./routes/workerRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/worker', workerRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
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

