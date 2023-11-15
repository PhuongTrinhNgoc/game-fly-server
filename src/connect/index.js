// connect/index.js
const mongoose = require('mongoose');

async function conect() {
    try {
        if (!process.env.MONGODB_URL) {
            console.error('Lỗi: Biến môi trường MONGODB_URL không được định nghĩa');
            throw new Error('MONGODB_URL không được định nghĩa trong biến môi trường');
        }

        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MONGODB_URL:', process.env.MONGODB_URL);
       
        console.log('Kết nối thành công');
    } catch (error) {
        console.error(error.message);
        console.log('Lỗi kết nối');
    }
}

module.exports = { conect };
