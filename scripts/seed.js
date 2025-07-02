const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');  // 根據你的資料模型調整此處

// Demo data
const demoUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'abcdef',
  },
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Seed function
const seedData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(demoUsers);
    console.log('Seed data successfully inserted!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
