const express=require('express');

const app=express();

const path=require('path');

const mongoose=require('mongoose');

const Company=require('./models/company');

const Train=require('./models/train');

const {v4:uuid}=require("uuid");

app.use(express.urlencoded({extended:true}));


mongoose.connect('mongodb://127.0.0.1:27017/trainStatus');

mongoose.set('strictQuery', true);

const db=mongoose.connection;

db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected!");
});
    

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

function sortTrain(trains){
   trains.sort((a, b) =>((a.price.sleeper+a.price.ac) - (b.price.sleeper+b.price.ac)));
   trains.sort((a, b) =>((b.seatsAvailable.sleeper+b.seatsAvailable.ac) -(a.seatsAvailable.sleeper+a.seatsAvailable.ac) ));
   trains.sort((a, b) =>((b.departureTime.hours*60+b.departureTime.minutes+(b.departureTime.seconds/60)+b.delayedBy) -(a.departureTime.hours*60+a.departureTime.minutes+(a.departureTime.seconds/60)+a.delayedBy)));
   return trains;
}

app.get('/train/trains',async (req,res)=>{
    let trains=await Train.find({});
    trains=sortTrain(trains);
    res.status(200).render('index',{trains});
    // res.send("Hello!");
})

app.get('/train/trains/:trainNumber',async (req,res)=>{
    const tNum=req.params.trainNumber;
    let train=await Train.find({trainNumber:tNum});
    res.send(train);
})

app.get('/train/register',(req,res)=>{
    res.render('new');
})

app.get('/train/:cId/auth',async (req,res)=>{
    const findCompany=await Company.findById(req.params.cId);
    findCompany.tokenType="Bearer";
    findCompany.accessToken=uuid();
    expiresIn:Date.now();
    await findCompany.save();
    res.status(200).send(findCompany);
});

app.post('/train/register',async (req,res)=>{
    const newTrainCompReg=new Company(req.body);
    const cliSecret=Math.floor(Math.random() * Date.now()).toString(16);
    newTrainCompReg.clientSecret=cliSecret;
    await newTrainCompReg.save();
    res.status(200).send(newTrainCompReg);
});



app.listen(3000,()=>{
    console.log("APP IS LISTENING AT PORT 3000!!");
})