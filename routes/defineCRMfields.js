const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const isAdmin = require('./isAdminMiddleware');

const user = require("../Models/User");

const router = express.Router();

const crmFieldsdefined = require("../Models/CrmFieldDefined");

// Authentication to be incluedd yet
// only for admin


router.post("/",isAdmin,async (req,res)=>{
    try{
        console.log(req.user)
        deleter = await crmFieldsdefined.deleteMany({by:req.user});
        // console.log(deleter)
        const data = new crmFieldsdefined({
            custom:req.body.custom,
            by:req.user
        });
       const savedField = await data.save();
        res.send(savedField);
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
});

router.get("/",async (req,res)=>{

    try{
        
        var myuser = await user.find({_id:req.user});
        console.log(myuser)
        team = myuser[0].team;

        var ans = await crmFieldsdefined.find({by:team})
        console.log("*******************************************************")
        try{

            ans = ans[0].custom
            var keys = []
            for (var key in ans){
                keys.push({"field":key});
            }
            console.log(keys);
            res.send(keys);
        }catch{
            res.send([]);
        }
        
        // var keys = []
        // for (var key in ans){
        //     keys.push(key);
        // }
        // console.log(keys);
        // res.send([]);

    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
});

module.exports = router;