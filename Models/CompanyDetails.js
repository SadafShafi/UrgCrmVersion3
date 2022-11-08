const mongoose = require('mongoose');

const CompanyDetails = new mongoose.Schema({
        name:{
            type:String
        },
        address:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        },
        pincode:{
            type:Number
        },
        by : {
            type:mongoose.Schema.ObjectId,
            refrence:"User"
        }

    
});



module.exports = mongoose.model('CompanyDetails',CompanyDetails);