const express = require('express');
const app = express();
//connect to mongodb
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const userRouter = require('./routes/userRouter');
const cors = require('cors');
app.use(cors());

app.use(express.json())
mongoose.connect(process.env.URI).then(()=>{
    console.log('connected successfully');


    app.listen(process.env.PORT || 8000,(err)=>{
        if(err){
            console.log(err)
        }
        console.log("successfully running on ",process.env.PORT)
    })
}).catch((err)=>{
    console.log(err);
})

app.use(userRouter);
