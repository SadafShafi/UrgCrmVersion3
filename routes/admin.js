const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const callData = require("../Models/Calldata");
const crmFields = require("../Models/CRMfields");
const user = require('../Models/User');
const desi = require("../Models/DesignationsAdded");
const process = require("../Models/Process");

// router.post("/custom",async (req,res)=>{
//     console.log(req.body.custom);
//     try{
//         const data = new crmFields({
//             custom:req.body.custom
//         });
//         const savedField = await data.save();
//         res.send(savedField);
//     }catch(err){
//         res.send(err);
//     }
// });


router.get("/process",async (req,res)=>{
        // console.log(req.user);

        // res.send(await process.find({
        
        // }));
        try{
            res.send(await process.find({by:req.user}));
        }catch(err){
            res.send(err)
        }
});

router.post("/process",async (req,res)=>{
    try{
        const data = new process({
            name:req.body.name,
            type:req.body.type,
            user:req.body.user,
            by:req.user
        });
        res.send(await data.save())
    }catch(err){
        res.send(err);
    }
});

// router.post("/process",async (req,res)=>{
//     try{
//         const data = new process({
//             name:req.body.name,
//             type:req.body.type,
//             user:req.body.user
//         });
//         res.send(await data.save())
//     }catch(err){
//         res.send(err);
//     }
// });

router.patch("/process/:id",async (req,res)=>{

    try{
    var toUpdate = await process.findOne({Id:req.user,_id:req.params.id});
    console.log(toUpdate)
    if(!toUpdate ){ 
        
        return res.send("No Such post by you");
    }
    else{
    var updated = toUpdate.user.concat(req.body.user);
     updated = await process.updateOne(
        {_id:req.params.id},
        {
            $set:{user:updated}
        }
    );

    res.send(updated)

    }
    }catch(err){
        res.send(err)
    }
});

router.get("/designations",async (req,res)=>{
    try{
        console.log(req.user);
        res.send(await desi.find({by:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.post("/designations",async (req,res)=>{

    try{
        console.log("designations post");
        const data = new desi({
            designation : req.body.designation,
            by: req.user
        });
        const savedUser = await data.save();
        res.send(savedUser);
    }catch(err){
        res.send(err);
    }
});

router.delete("/designations/:todelete",async (req,res)=>{
    try{
        console.log(req.user,"deletion started");
        ans = await desi.deleteOne({by:req.user,designation:req.params.todelete})
        desi.save()
        res.send(ans);
    }catch(err){
        res.send(err);
    }
});





router.get("/members",async (req,res)=>{
    try{
        console.log("try");
        res.send(await user.find({team:req.user})
                .select({"name":1}));
    }catch(err){
        console.log("catch");
        res.send(err);
    } 
});

router.get("/members/:Id",async (req,res)=>{
    try{
        res.send(await user.find({team:req.user,
            _id:req.params.Id}));
    }catch(err){
        res.send(err);
    } 
});

router.patch("/allocate/:userId/:callId",async (req,res)=>{

    try{
        console.log(req.params.callId,req.params.userId)
        await callData.updateOne(
            {_id:req.params.callId},
            {
                $set:{allocatedTo:req.params.userId}
            }
        );

        res.send( await callData.find({_id:req.params.callId}))
    }catch(err){
        res.send(err);
    }

});


router.post("/createuser",async (req,res)=>{

    var isUserPresent = await user.findOne({
        mobNumber:req.body.mobNumber
    });
    if(isUserPresent) return res.status(400).send("This number is already registered");
    try{
        //Hash the password 
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const User = new user({
            name: req.body.name,
            email: req.body.email, 
            mobNumber: req.body.mobNumber,
            company : req.body.company,
            teamCount : req.body.teamCount,
            salesCode : req.body.salesCode,
            password : hashedPassword,
            designation:req.body.designation,
            team:req.user
        });
        const savedUser = await User.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});



router.get("/",async (req,res)=>{
        try{
            console.log("try",req.user);
            res.send(await callData.find());
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


// router.put("/:id",async (req,res)=>{

//     console.log("putter")

//     callData.findByIdAndUpdate(
//         // the id of the item to find
//         req.params.id,
        
//         // the change to be made. Mongoose will smartly combine your existing 
//         // document with this change, which allows for partial updates too
//         req.body,
        
//         // an option that asks mongoose to return the updated version 
//         // of the document instead of the pre-updated one.
//         {new: true},
        
//         // the callback function
//         (err, data) => {
//         // Handle any possible database errors
//             if (err) return res.status(500).send(err);
//             return res.send(data);
//         }
//     )


// });
module.exports = router;