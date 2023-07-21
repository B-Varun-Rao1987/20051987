const { cssNumber } = require('jquery');
const { number } = require('mathjs');
const mongoose=require('mongoose');

const trainSchema=new mongoose.Schema({
    trainName:{
        type:String
    },
    trainNumber:{
        type:String
    },
    departureTime:{
        hours:Number,
        minutes:Number,
        seconds:Number
    },
    seatsAvailable:{
        sleeper:Number,
        ac:Number,
    },
    price:{
        sleeper:Number,
        ac:Number
    },
    delayedBy:Number
});

module.exports=mongoose.model('Train',trainSchema);