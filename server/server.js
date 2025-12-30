// Basic Express server setup with mounted route groups
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const workerRoutes = require('./routes/workerRoutes');

const app = express();

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/worker', workerRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

