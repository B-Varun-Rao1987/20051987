const mongoose=require('mongoose');

const companySchema=new mongoose.Schema({
    companyName:{
        type:String
    },
    ownerName:{
        type:String
    },
    rollno:Number,
    ownerEmail:String,
    accessCode:String,
    clientSecret:String,
    tokenType:String,
    accessToken:String,
    expiresin:Number
});

module.exports=mongoose.model('Company',companySchema);