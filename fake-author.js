const mongoose = require('mongoose');
const { Author, Game } = require('./src/model/model');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to generate random number
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate fake data for authors
const generateFakeAuthorData = async () => {
  try {
    // Create 20 authors with random data
    const authors = await Author.create([...Array(20)].map(() => ({
      name: `Author ${getRandomNumber(1, 100)}`,
      year: getRandomNumber(1990, 2023), // Random year between 1990 and 2023
      games: [],
    })));

    console.log('Fake author data created successfully:', authors);
  } catch (error) {
    console.error('Error creating fake author data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Run the function to create fake data for authors
generateFakeAuthorData();
