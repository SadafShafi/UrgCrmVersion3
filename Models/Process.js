// const { json } = require('body-parser');
const mongoose = require('mongoose');

const Process = new mongoose.Schema({


        name:{
            type:String,
            required:true
        },

        type:{
            type:String,
            enum : ["Inbound & Outbound","Oubound","Inbound"]
        },

        by : {
            type:mongoose.Schema.ObjectId,
            refrence:'User'
        },
        user:{
            type:[mongoose.Schema.ObjectId],
            refrence:'User'

        }
    
});



module.exports = mongoose.model('Process',Process);