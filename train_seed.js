const mongoose=require('mongoose');
const Train=require('../models/train');

mongoose.connect('mongodb://127.0.0.1:27017/trainStatus')
.then(()=>{
    console.log("MONGO CONNECTION OPEN!");
})
.catch((err)=>{
    console.log("OH NO MONGO CONNECTION ERROR...\n",err);
})

mongoose.set('strictQuery', true);

const seedTrains=[
    {
        trainName:"Chennai Exp",
        trainNumber:"2344",
        departureTime:{
            hours:21,
            minutes:35,
            seconds:0,
        },
        seatsAvailable:{
            sleeper:3,
            ac:1,
        },
        price:{
            sleeper:2,
            ac:5,
        },
        delayedBy:15
    },
    {
        trainName:"Hyderabad Exp",
        trainNumber:"2341",
        departureTime:{
            hours:23,
            minutes:55,
            seconds:0,
        },
        seatsAvailable:{
            sleeper:6,
            ac:1,
        },
        price:{
            sleeper:554,
            ac:1854,
        },
        delayedBy:5
    }
];

// Train.insertMany(seedTrains).then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.log(err);
// })