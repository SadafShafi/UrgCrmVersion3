const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

const whatsapp = require("../Models/WhatsappTemplate");
const email = require("../Models/EmailTemplate");
const sms = require("../Models/SmsTemplate");
const telegram = require('../Models/TelegramTemplate');


router.get("/email",async (req,res)=>{
    try{
        res.send(await email.find({Id:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.get("/whatsapp",async (req,res)=>{
    try{
        res.send(await whatsapp.find({Id:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.get("/sms",async (req,res)=>{
    try{
        res.send(await sms.find({Id:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.get("/telegram",async (req,res)=>{
    try{
        res.send(await telegram.find({Id:req.user}));
    }catch(err){
        res.send(err);
    }
});



router.post("/email",async (req,res)=>{
    try{
        const data = new email({
            label:req.body.label,
            subject:req.body.subject,
            message:req.body.message,
            Id:req.user
        });
        const savedField = await data.save();
        res.send(savedField)
    }catch(err){
        console.log("error");
        console.log(err);
        res.send(err);
    }
});

router.post("/whatsapp",async (req,res)=>{
    try{
        const data = new whatsapp({
            label:req.body.label,
            message:req.body.message,
            Id:req.user
        });
        const savedField = await data.save();
        res.send(savedField)
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
});

router.post("/sms",async (req,res)=>{
    try{
        console.log("saving the data")
        const data = new sms({
            label:req.body.label,
            message:req.body.message,
            Id:req.user
        });
        const savedField = await data.save();
        res.send(savedField)
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
});

router.post("/telegram",async (req,res)=>{
    try{
        console.log("saving the data")
        const data = new telegram({
            label:req.body.label,
            message:req.body.message,
            Id:req.user
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