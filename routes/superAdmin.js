const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const callData = require("../Models/Calldata");
const user = require("../Models/User");
const crmFields = require("../Models/CrmFieldDefined");

router.post("/custom",async (req,res)=>{

    try{
        const data = new crmFields({
            custom:req.body.custom
        });
        const savedField = await data.save();
        res.send(savedField);
    }catch(err){
        res.send(err);
    }
});

router.get("/members",async (req,res)=>{
    try{
        console.log("try");
        res.send(await callData.find().select({"name":1}));
    }catch(err){
        console.log("catch");
        res.send(err);
    } 
});

router.get("/users",async (req,res)=>{
    try{
        // console.log("try");
        res.send(await user.find());
    }catch(err){
        console.log(err);
        res.send(err);
    } 
});

router.get("/members/:Id",async (req,res)=>{
    try{
        console.log("try");
        // console.log()
        res.send(await user.find({_id:req.params.Id}));
    }catch(err){
        console.log("catch");
        res.send(err);
    } 
});

// router.post("/createuser",async (req,res)=>{

//     var isUserPresent = await User.findOne({
//         mobNumber:req.body.mobNumber
//     });
//     if(isUserPresent) return res.status(400).send("This number is already registered");
//     try{
//         //Hash the password 
//         const salt = await bcrypt.genSalt(7);
//         const hashedPassword = await bcrypt.hash(req.body.password,salt);
//         const user = new User({
//             name: req.body.name,
//             email: req.body.email, 
//             mobNumber: req.body.mobNumber,
//             company : req.body.company,
//             teamCount : req.body.teamCount,
//             salesCode : req.body.salesCode,
//             password : hashedPassword,
//             designation:req.body.designation,
//             team:req.user._id
//         });
//         const savedUser = await user.save();
//         res.send(savedUser);
//     }catch(err){
//         res.status(400).send(err);
//         console.log(err);
//     }
// });

router.get("/",async (req,res)=>{
        try{
            console.log("try");
            res.send(await callData.find());
        }catch(err){
            console.log("catch");
            res.send(err);
        } 
});
router.get("/:callId",async (req,res)=>{
    try{
        console.log("try");
        console.log(req.params.callId)
        res.send(await callData.findOne({_id:req.params.callId}));
    }catch(err){
        console.log("catch");
        res.send(err);
    } 
});

router.get("/status/:status",async(req,res)=>{
    try{
        const cursor = await callData.find({status:req.params.status})
        res.send(cursor);
    }catch(err){
        res.send(err);
    }
});

router.get("/name/:name",async(req,res)=>{
    try{
        const cursor = await callData.find({name:req.params.name})
        res.send(cursor);
    }catch(err){
        res.send(err);
    }
});

router.get("/mobnumber/:mobnumber",async(req,res)=>{
    try{
        const cursor = await callData.find({mobNumber:req.params.mobnumber})
        res.send(cursor);
    }catch(err){
        res.send(err);
    }
});

router.get("/company/:company",async(req,res)=>{
    try{
        const cursor = await callData.find({company:req.params.company})
        res.send(cursor);
    }catch(err){
        res.send(err);
    }
});


router.get("/search/:searchby",async(req,res)=>{
    try{
        console.log(Number(req.params.searchby));
        var cursor;
        if(!Number(req.params.searchby)){
            cursor = await callData.find({$or:[
                {name:req.params.searchby},
                {company:req.params.searchby},
            ]});
        }
        else{
            cursor = await callData.find({$or:[
                {name:req.params.searchby},
                {company:req.params.searchby},
                {mobNumber:req.params.searchby},
            ]});
        }
        
        res.send(cursor);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});



router.get("/date/:date",async (req,res)=>{
    try{
        const cursor = await callData.find({date: { $gte:  req.params.date} });
        res.send(cursor);
    }catch(err){
        res.send(err);
    }
});

router.get("/daterange/:datelow/:datehigh",async (req,res)=>{
    try{
        const cursor = await callData.find({
            date:
             { $gte:req.params.datelow,
                $lt:req.params.datehigh} 
            });
        res.send(cursor);

    }catch(err){
        res.send(err);
    }
});

module.exports = router;