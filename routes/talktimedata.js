const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

const talktime = require("../Models/Talktime");

router.get("/",async (req,res)=>{

    try{

        console.log(req.user._id)

        res.send(await talktime.find({Id:req.user._id}));
        

    }catch(err){
        res.send(err);
    }



});

router.post("/",async (req,res)=>{

    try{

        console.log("saving the data")
        const data = new talktime({

            totalTalkTime:req.body.totalTalkTime,
            noCalls:req.body.noCalls,
            breakTime:req.body.breakTime,
            idleTime:req.body.idleTime,
            loginTime:req.body.loginTime,
            wrapupTime:req.body.wrapupTime,
            Id:req.user._id

        });

        const savedField = await data.save();
        res.send(savedField)

    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
    
});

module.exports = router;