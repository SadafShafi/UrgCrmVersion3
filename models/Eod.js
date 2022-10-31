const mongoose = require('mongoose');

// Eod = End of the day

const Eod = new mongoose.Schema({

    name:{
        type:String
    },
    mobNumber:{
        type:Number,
        required:true
    },
    website:{
        type:String
    },
    deposite:{
        type:Number
    },
    paymentMode:{
        type:String
    },
    Id:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Eod',Eod);

