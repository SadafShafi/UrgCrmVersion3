const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    designation:{
        type:[String],
        enum:["user","admin","superadmin"],
        default:["user","admin"]
    },
    team:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        // required:true
    },
    email:{
        type:String,
        required: true,
        max: 255,
        min: 6
    },
    mobNumber:{
        type:Number,
        required:true,
    },
    company :{
        type:String,
        required: true,
        max: 255,
        min: 6
    },
    teamCount:{
        type:Number,
        required:true,
        default:2
    },
    salesCode:{
        type:String
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userSchema);