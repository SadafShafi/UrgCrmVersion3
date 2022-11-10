const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path')

require('dotenv').config()

const router = express.Router();

const callData = require("../Models/Calldata");
const crmFields = require("../Models/CRMfields");
const user = require('../Models/User');
const desi = require("../Models/DesignationsAdded");
const process = require("../Models/Process");
const license = require('../Models/License');
const companyDetails = require('../Models/CompanyDetails');

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

router.post("/companydetails",async (req,res)=>{
    try{
        const data = new companyDetails({
            name:req.body.name,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            pincode:req.body.pincode,
            by:req.user,
        });
        res.send(await data.save())
    }catch(err){
        res.send(err);
    }
});

router.put("/companydetails",async (req,res)=>{    
    var ans = await companyDetails.findOneAndUpdate(
        req.user,
        req.body,
        {new: true}
    );
    console.log(ans);
    res.send({"message":"upadted"});
});

router.get("/companydetails",async (req,res)=>{
    try{
        res.send(await companyDetails.find({by:req.user}));
    }catch(err){
        res.send(err);
    }
});

router.get("/transferallocations/:from/:to",async (req,res)=>{
    console.log("license")
    try{
        var ans = await callData.find({allocatedTo:req.params.from});
        ans.forEach(async (x)=>{
            callData.findOneAndUpdate({_id:x._id},
                {$set:{allocatedTo:req.params.to}})
        });
        res.send({"message":"Allocations changed"});
    }catch(err){
        res.send(err);
    }
});

async function datatocsv(fieldArray,dataArray,req){
    try{
        csv = json2csv(dataArray, { fieldArray });
        console.log(__dirname);
        const filePath = path.join(__dirname, req.user + ".csv")
        await fs.writeFile(filePath, csv,(x)=>console.log("File Made"));
        return true;
    }catch(err){
        console.log(err);
        return err;
    }
}

router.get("/reports/:datefrom/:dateto/:type",async (req,res)=>{
    console.log("reports");    
    console.log("Email Admin");
    // console.log(process.env.EMAIL_SENDER);
    try{

        // customers CSV
        var dataCustomers = await callData.find();
        // console.log(dataCustomers[1])
        // dataCustomers[1].forEach((x)=>{
        //     console.log(x)
        // }); 
        datatocsv(Object.keys(dataCustomers[0]),dataCustomers,req);
        // res.send(dataCustomers);

        var userEmail = user.findOne({_id:req.user});
        userEmail = userEmail.email
        // userEmail.email;
        // email to the super admin and requester
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "respectyouranonymity@gmail.com",
                // process.env.EMAIL_SENDER, // generated ethereal user
                pass: "aauykrqqkvcwcnxi"
                // process.env.APP_PASS, // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"URG CRM "respectyouranonymity@gmail.com', // sender address
            to: ["daee.sadaf2011@gmail.com",userEmail], // list of receivers
            subject: "Your request for reports", // Subject line
            text: `Your reports will be mailed to you soon\n Type : ${req.params.type}\n 
            From ${req.params.datefrom} \nTo ${req.params.dateto}` , // plain text body
            html: `Your reports will be mailed to you soon\n Type : ${req.params.type}\n 
            From ${req.params.datefrom} \nTo ${req.params.dateto}`, // html body
        });

        res.send({"message":"reports will be mailed to you soon"})
    }catch(err){
        res.send({"message":"official emails to be added"})
    }
});

router.get("/advancedreports/:datefrom/:dateto/:type",async (req,res)=>{
    console.log("advanced reports")
    try{
        // email to the super admin and requester
        res.send({"message":"advanced reports will be mailed to you soon"})
    }catch(err){
        res.send({"message":"official emails to be added"})
    }
});


router.get("/license",async (req,res)=>{
    console.log("license")
    try{
        res.send(await license.find({by:req.user}));
    }catch(err){
        res.send(err)
    }
});

router.get("/license/:number",async (req,res)=>{
    console.log("license making")
    try{
        for(var x = 0; x<req.params.number;x++){
            const data = new license({by:req.user});
            await data.save();
        }

        res.send({"message":"Licenses created"});
    }catch(err){
        res.send(err)
    }
});

router.put("/license/:id",async (req,res)=>{

    console.log(req.params.id)

    await license.findOneAndUpdate(
        {_id : req.params.id},
        req.body,
        {new: true},

        (err, data) => {
            if (err) return res.status(500).send(err);
            return res.send(data);
        })
});

// router.post("/license/:id",async (req,res)=>{

//     console.log(req.params.id)

//     await license.findOneAndUpdate(
//         {by : req.body.user},
//         req.body,
//         {new: true},

//         (err, data) => {
//             if (err) return res.status(500).send(err);
//             return res.send(data);
//         })
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

router.get("/downloadrecordings/:datefrom/:dateto",async (req,res)=>{
    try{
        // res.send(await user.find({team:req.user,
        //     _id:req.params.Id}));
        res.send({"message":"no recordings here"})
    }catch(err){
        res.send(err);
    } 
});

router.post("/addcustomers",async (req, res)=>{
    try{
        req.body.datalist.forEach(async (datapoint)=>{
            const isthere = await callData.findOne({mobNumber:datapoint.mobNumber});
            console.log(req.user)
            if(isthere && req.body.edit){
                console.log("Number already present use Update method");
                await callData.findOneAndUpdate(
                    {mobNumber : datapoint.mobNumber},
                    datapoint,
                    {new: true},
                    (err, data) => {
                        if (err) console.log(err);
                        // return res.send(data);
                        console.log(data)
                    });
            }
            else{
                
                const data = new callData({
                    name: datapoint.name,          
                    email:datapoint.email, 
                    mobNumber:datapoint.mobNumber,
                    company :datapoint.company,
                    address:datapoint.address,
                    city:datapoint.city,
                    state:datapoint.state,
                    country:datapoint.country,
                    pin:datapoint.pin,
                    fixed:datapoint.fixed,
                    custom:datapoint.custom,
                    history:datapoint.history,
                    status:datapoint.status,
                    Id:req.user
                });
                const savedField = await data.save();
            }
        });
        res.send({"message":"Data Saved"});
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
    
})




router.post("/addallocations",async (req, res)=>{
    try{
        req.body.datalist.forEach(async (datapoint)=>{
            const isthere = await callData.findOne({mobNumber:datapoint.mobNumber});
            console.log(req.user)
            if(isthere && req.body.edit){
                console.log("Number already present use Update method");
                await callData.findOneAndUpdate(
                    {mobNumber : datapoint.mobNumber},
                    datapoint,
                    {new: true},
                    (err, data) => {
                        if (err) console.log(err);
                        // return res.send(data);
                        console.log(data)
                    });
            }
            else{
                
                const data = new callData({
                    name: datapoint.name,          
                    email:datapoint.email, 
                    mobNumber:datapoint.mobNumber,
                    company :datapoint.company,
                    address:datapoint.address,
                    city:datapoint.city,
                    state:datapoint.state,
                    country:datapoint.country,
                    pin:datapoint.pin,
                    fixed:datapoint.fixed,
                    custom:datapoint.custom,
                    history:datapoint.history,
                    status:datapoint.status,
                    allocatedTo:datapoint.allocatedTo,
                    Id:req.user
                });
                const savedField = await data.save();
            }
        });
        res.send({"message":"Data Saved"});
    }catch(err){
        console.log("error")
        console.log(err)
        res.send(err)
    }
});

router.delete("/deletecustomers",async (req,res)=>{
    try{
        req.body.numberlist.forEach(async (number)=>{
            await callData.remove({mobNumber:number});
        });

        res.send({"message":"all the users deleted"})


    }catch(err){
        console.log(err)
        res.send(err)
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

router.patch("/deleteallocations/",async (req,res)=>{

    try{
        console.log(req.params.callId,req.params.userId)
        req.body.numberlist.forEach(async (number)=>{
            await user.updateOne(
                {mobNumber:number},
                {
                    $set:{allocatedTo:""}
                });

        });
        res.send( {"message":"allocations deleted"})
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
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            pin:req.body.pin,
            country:req.body.country,
            teamCount : req.body.teamcount,
            salesCode : req.body.salescode,
            password : hashedPassword,
            designation:req.body.designation,
            addedDesignation : req.body.addedDesignation,
            accesstoWeb : req.body.accesstoWeb,
            playcall : req.body.playcall,
            download : req.body.download,
            trackcall : req.body.trackcall,
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





