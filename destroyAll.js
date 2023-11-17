const mongoose = require('mongoose');
const { Author, Game } = require('./src/model/model');
require('dotenv').config();

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Hàm xóa tất cả dữ liệu của Author và Game
const removeAllData = async () => {
  try {
    // Xóa tất cả dữ liệu của Author
    await Author.deleteMany({});
    console.log('All Author data removed.');

    // Xóa tất cả dữ liệu của Game
    await Game.deleteMany({});
    console.log('All Game data removed.');
  } catch (error) {
    console.error('Error removing data:', error);
  } finally {
    // Ngắt kết nối từ MongoDB
    mongoose.disconnect();
  }
};

// Chạy hàm để xóa tất cả dữ liệu
removeAllData();
