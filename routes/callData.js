const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const callData = require("../Models/Calldata");

router.get("/",async (req,res)=>{

    try{
        console.log(req.user);

        res.send(await callData.find({Id:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.get("/status/:status",async(req,res)=>{
    try{

        const cursor = await callData.find({Id:req.user,status:req.params.status})

        res.send(cursor);

    }catch(err){
        res.send(err);
    }
});

router.get("/name/:name",async(req,res)=>{
    try{

        const cursor = await callData.find({Id:req.user,name:req.params.name})

        res.send(cursor);

    }catch(err){
        res.send(err);
    }
});

router.get("/mobnumber/:mobnumber",async(req,res)=>{
    try{

        const cursor = await callData.find({Id:req.user,mobNumber:req.params.mobnumber})

        res.send(cursor);

    }catch(err){
        res.send(err);
    }
});

router.get("/company/:company",async(req,res)=>{
    try{

        const cursor = await callData.find({Id:req.user,company:req.params.company})

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
                {Id:req.user,name:req.params.searchby},
                {Id:req.user,company:req.params.searchby},
            ]});

        }
        else{
            cursor = await callData.find({$or:[
                {Id:req.user,name:req.params.searchby},
                {Id:req.user,company:req.params.searchby},
                {Id:req.user,mobNumber:req.params.searchby},
            ]});

        }
        
        res.send(cursor);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const cursor = await callData.findOne({Id:req.user,_id:req.params.id})
        res.send(cursor);
    }catch(err){
        res.send(err);
    }
});

router.get("/date/:date",async (req,res)=>{

    try{
        const cursor = await callData.find({Id:req.user,date: { $gte:  req.params.date} });
        res.send(cursor);

    }catch(err){
        res.send(err);
    }

});

router.get("/daterange/:datelow/:datehigh",async (req,res)=>{

    // console.log(req.params.datelow);
    // console.log(req.params.datehigh);
    // res.send("Done");

    try{

        const cursor = await callData.find({Id:req.user,
            date:
             { $gte:  req.params.datelow,
                $lt:req.params.datehigh} 
            });
        res.send(cursor);

    }catch(err){
        res.send(err);
    }



});

router.get("/getallocations/",async (req,res)=>{
    try{

        const cursor = await callData.find({allocatedTo:req.user,});
        res.send(cursor);

    }catch(err){
        res.send(err);
    }
});


router.post("/",async (req,res)=>{

    try{

        console.log(req.user._id)
        const isthere = await callData.findOne({mobNumber:req.body.mobNumber});
        console.log(req.user)
        if(isthere){
            console.log("Number already present ");
            res.send({"error":"Number already saved "});
            return;
        }
        const data = new callData({
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
            history:req.body.history,
            status:req.body.status,
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

router.patch("/:id",async (req,res)=>{

    try{
    var toUpdate = await callData.findOne({Id:req.user,_id:req.params.id});
    console.log(toUpdate)
    if(!toUpdate || !toUpdate.history){ 
        
        return res.send("No Such post by you");
    }
    else{
    var updated = toUpdate["history"].concat(req.body.history);
     updated = await callData.updateOne(
        {_id:req.params.id},
        {
            $set:{history:updated}
        }
    );

    res.send(await callData.findOne({Id:req.user,_id:req.params.id}));}}
    catch(err){
        res.send(err);
        console.log(err)
    }


});


router.patch("/:id",async (req,res)=>{

    try{
    var toUpdate = await callData.findOne({Id:req.user,_id:req.params.id});
    console.log(toUpdate)
    if(!toUpdate || !toUpdate.history){ 
        res.send("No Such post by you")
    }
    var updated = toUpdate["history"].concat(req.body.history);
     updated = await callData.updateOne(
        {_id:req.params.id},
        {
            $set:{history:updated}
        }
    );

    res.send(await callData.findOne({Id:req.user,_id:req.params.id}));}
    catch(err){
        res.send(err)
    }


});


router.put("/:id",async (req,res)=>{

    console.log("putter")

    // const isThere = await callData.findOne({Id:req.user,_id:req.params.id});
    // if (!isThere) res.send("Only the ")

    callData.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, data) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(data);
        }
    )


});




module.exports = router;
