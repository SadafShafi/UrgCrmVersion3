const mongoose = require('mongoose');

const License = new mongoose.Schema({


        name:{
            type:String,
            // required:true
        },

        type:{
            type:String,
            enum : ["Inbound & Outbound","Inbound","Inbound"]
        },

        by : {
            type:mongoose.Schema.ObjectId,
            refrence:'User'
        },
        user:{
            type:mongoose.Schema.ObjectId,
            refrence:'User'
        },
        username :{
            type:String,
            refrence:'User'
        },
        expireson : {

            type:Date,
            default:Date.now() + 8

        }

    
});



module.exports = mongoose.model('License',License);