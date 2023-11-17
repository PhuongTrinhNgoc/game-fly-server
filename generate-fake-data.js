const mongoose = require('mongoose');
const { Author, Game } = require('./src/model/model');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to generate random number
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate fake data for games
const generateFakeGameData = async () => {
  try {
    // Fetch all authors
    const authors = await Author.find();

    // Create 20 games with random data and associate with authors
    const games = await Game.create([...Array(20)].map(() => ({
      name: `Game ${getRandomNumber(1, 100)}`,
      publishedDate: getRandomNumber(2000, 2023).toString(), // Random year between 2000 and 2023
      genres: ['Action', 'Adventure', 'RPG', 'Simulation', 'Strategy'], // Example genres
      publisher: getRandomAuthor(authors)._id,
      status: true, // You can set the status to a default value
    })));

    // Update the games array for each author
    for (const game of games) {
      const author = await Author.findById(game.publisher);
      if (author) {
        author.games.push(game._id);
        await author.save();
      }
    }

    console.log('Fake game data created successfully:', games);
  } catch (error) {
    console.error('Error creating fake game data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Function to get a random author
const getRandomAuthor = (authors) => {
  return authors.length ? authors[Math.floor(Math.random() * authors.length)] : null;
};

// Run the function to create fake data for games
generateFakeGameData();
