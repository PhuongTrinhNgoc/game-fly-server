const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

 const publisherSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    year:{
        type:Number,
        require:true
    },
    games:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Game"
        },
        
    ]
 })
 const gameSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    publishedDate:{
        type:String
    },
    generes:{
        type:[String]
    },
    publisher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    status:{type:Boolean}
 })
 gameSchema.plugin(mongoosePaginate);

 let Game = mongoose.model('Game',gameSchema)
 let Author = mongoose.model('Author',publisherSchema)
 module.exports = {Game,Author}