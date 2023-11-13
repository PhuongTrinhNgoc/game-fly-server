const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
async function conect(){
    
    try {
    await mongoose.connect(process.env.MONGODB_URL);
        console.log('succsess');
    } catch (error) {
        console.log('succsess err');
        
    }
}
module.exports = {conect}