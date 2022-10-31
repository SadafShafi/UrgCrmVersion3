const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Authentication yet to be introduced 
//

// Not Needed any More 
// As we have Call Data doing the same

const router = express.Router();

const crmFields = require("../Models/CRMfields");

router.get("/",async (req,res)=>{

    try{
        console.log("getting the data");

        const projection = { name: 1 };
        const cursor = await crmFields.find({},{mobNumber:1})

        res.send(cursor);

    }catch(err){
        res.send(err);
    }



});

router.get("/:id",async(req,res)=>{

    try{
        // console.log("getting the data");

        const cursor = await crmFields.find({_id:req.params.id})

        res.send(cursor);

    }catch(err){
        res.send(err);
    }

});




router.post("/",async (req,res)=>{

    try{

        console.log("saving the data")
        const data = new crmFields({
            name: req.body.name,          
            email:req.body.email, 
            mobNumber:req.body.mobNumber,
            company :req.body.company,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            pin:req.body.pin,
            fixed:req.body.fixed,
            custom:req.body.custom,

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