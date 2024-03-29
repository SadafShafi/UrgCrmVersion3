const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();

const User = require("../Models/User");

router.post("/register", async (req,res)=>{

    var isUserPresent = await User.findOne({
        mobNumber:req.body.mobNumber
    });
    if(isUserPresent) return res.status(400).send("This number is already registered");
    

    try{
        //Hash the password 
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(req.body.designation)

        const user = new User({
            name: req.body.name,
            email: req.body.email, 
            mobNumber: req.body.mobNumber,
            company : req.body.company,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            pin:req.body.pin,
            country:req.body.country,
            teamCount : req.body.teamcount,
            salesCode : req.body.salescode,
            password : hashedPassword,
            // team:req.user
        });
        var savedUser = await user.save();
        console.log("saveduser")
        console.log(savedUser._id)
        let updated = await User.updateOne({_id:savedUser._id},
            {$set:{team:savedUser._id}});
        // console.log(updated)
        savedUser = await User.find({_id:savedUser._id});
        res.send(savedUser);
        // return
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});

router.post("/login",async (req,res)=>{

    const user = await User.findOne({
        mobNumber:req.body.mobNumber
    });
    
    if(!user) return res.status(400).send("This number is not registered yet");

    const validPass = await bcrypt.compare(
        req.body.password,
        user.password 
        );
    
    if(!validPass) return res.status(400).send("wrong password, please check it once again");
    
    try{

        //  An Auth token is returned as a header 
        //  auth-token
        // console.log(user)
        const token = jwt.sign({_id:user._id,designation:user.designation},
            process.env.SECRET_KEY);
        // console.log({_id:user._id,designation:user.designation});
        res.header('auth-token',token).send({"auth-token":token,"name":user.name});
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
    
});

module.exports = router;