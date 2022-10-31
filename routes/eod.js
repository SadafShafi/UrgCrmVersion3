const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

const eodData = require("../Models/Eod");

router.get("/",async (req,res)=>{

    try{
        console.log(req.user);
        res.send(await eodData.find({Id:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.post("/",async (req,res)=>{
    try{
        const data = new eodData({
            name:req.body.name,
            mobNumber:req.body.mobNumber,
            website:req.body.website,
            deposite:req.body.deposite,
            paymentMode:req.body.paymentMode,
            Id:req.user
        });
        const savedField = await data.save();
        res.send(savedField);
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    } 
});

module.exports = router;