const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

const crmFieldsdefined = require("../Models/CrmFieldDefined");

// Authentication to be incluedd yet
// only for admin


router.post("/",async (req,res)=>{

    try{
        await crmFieldsdefined.remove();
        const data = new crmFieldsdefined({

            fixed : req.body.fixed,
            custom:req.body.custom

        });

        const savedField = await data.save();
        res.send(savedField)

    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
    
});

router.get("/",async (req,res)=>{

    try{

        
        res.send(await crmFieldsdefined.find())

    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
    
});

module.exports = router;