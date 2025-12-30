const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Atlas connection string format:
    // mongodb+srv://username:password@cluster.mongodb.net/database?options
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('MongoDB connection string not found. Please set MONGODB_URI in your .env file');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
