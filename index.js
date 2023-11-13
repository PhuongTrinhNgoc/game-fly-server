const express = require('express')
const cors = require('cors');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./src/connect')
const authorRoute = require("./src/routes/author")
const gamesRoute = require("./src/routes/game")
dotenv.config();
//conect DB
db.conect()

app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())
app.use(morgan("common"))

app.use('/v1/author',authorRoute)
app.use('/v1/game',gamesRoute)

app.listen(8000,()=>{
    console.log('Server is running...')
});