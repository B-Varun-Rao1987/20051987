const mongoose=require('mongoose');
const Company=require('../models/company');

mongoose.connect('mongodb://127.0.0.1:27017/trainStatus')
.then(()=>{
    console.log("MONGO CONNECTION OPEN!");
})
.catch((err)=>{
    console.log("OH NO MONGO CONNECTION ERROR...\n",err);
})


mongoose.set('strictQuery', true);

const c=new Company({
    companyName:"Train Central",
    ownerName:"Rahul",
    rollno:1,
    ownerEmail:"rahul@abc.com",
    accessCode:'Fljsf'
})

// c.save()
// .then(msg=>{
//     console.log(msg);
// })
// .catch(err=>{
//     console.log("ERROR!!...\n",err);
// })