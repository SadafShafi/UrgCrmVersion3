const mongoose = require('mongoose');
const sms = new mongoose.Schema({

    label:{
        type:String
    },
    message:{
        type:String

    },

    Id:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    by:{
        type:String,   // admin or user
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('sms',sms);

