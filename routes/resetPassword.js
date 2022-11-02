const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config()

const router = express.Router();

const User = require("../Models/User");

router.post("/", async (req,res)=>{

    var isUserPresent = await User.findOne({
        email:req.body.email,
        mobNumber:req.body.mobNumber
    });

    console.log(isUserPresent);

    if(!isUserPresent) res.send("This Email is not registered");
    else{

    r = (Math.random() +10).toString(36).substring(2);

    //Hash the password 
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(r,salt);
        
    // Update password
    // var toUpdate = await User.findOne({email:req.body.email});


    
     updated = await User.updateOne(
        {email:req.body.email,
        mobNumber:req.body.mobNumber},
        {
            $set:{password:hashedPassword}
        });
    console.log(updated)


        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_SENDER, // generated ethereal user
                pass: process.env.APP_PASS, // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"URG CRM "respectyouranonymity@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Your Password for URG CRM", // Subject line
            text: "Your Password is >> "+r, // plain text body
            html: "Your Password is >> "+r, // html body
        });

        res.send("Email Sent");

    }
});

module.exports = router;