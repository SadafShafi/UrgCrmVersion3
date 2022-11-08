const mongoose = require('mongoose');

const License = new mongoose.Schema({


        name:{
            type:String,
            // required:true
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

        },
        designation : {
            type:String,
        }

    
});



module.exports = mongoose.model('License',License);