const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const showAll = await User.find();
        res.status(200).json(showAll);
    }catch(error){
        res.status(400).json({error:error.message});
    }
    

})

//get single user
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    try{
        const singleProduct = await User.findById({_id:id});
        res.status(200).json(singleProduct);
    }catch(error){
        res.status(400).json({error:error.message});
    }
    

})

//get single product and delete
router.delete('/:id',async(req,res)=>{
    const { id } = req.params;
    try{
        const deleteProduct = await User.findByIdAndDelete(id);
        res.status(200).json(deleteProduct);
    }catch(error){
        res.status(400).json({error:error.message});
    }
    

})

//put and patch(update)
router.patch('/:id',async(req,res)=>{
    const { id } = req.params;
    const {name,email,age} = req.body;
    try{
        const updateProduct = await User.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.status(200).json(updateProduct);
    }catch(error){
        res.status(400).json({error:error.message});
    }
    

})

router.post('/',async(req,res)=>{
    const {name,email,age} = req.body;
    try{
        const userAdded = await User.create({
            name:name,
            email:email,
            age:age,
        })
        res.status(201).send(userAdded)
        console.log("data added")
    }catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }
})

module.exports = router;