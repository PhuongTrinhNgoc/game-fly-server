const mongoose = require('mongoose');

async function connect() {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL không được định nghĩa trong biến môi trường');
        }

        console.log('MONGODB_URL:', process.env.MONGODB_URL);

        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Kết nối thành công');
    } catch (error) {
        console.error(error.message);
        console.log('Lỗi kết nối');
    }
}

module.exports = { connect };
