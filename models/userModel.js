const mongoose = require('mongoose');

//creating the schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
        unique:true,
    },age:{
        type:Number
    },
},{timestamps:true})
//creating the model
const User= mongoose.model('User',userSchema);
module.exports=User;