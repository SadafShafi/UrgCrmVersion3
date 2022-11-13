const { json } = require('body-parser');
const mongoose = require('mongoose');


// aka customer 

const CRMFields = new mongoose.Schema({

    
        name:{
            type:String,
            min: 6,
            max: 255
        },
        
        email:{
            type:String,
            max: 255,
            min: 6
        },

        mobNumber:{
            type:Number,
            required:true,
        },

        company :{
            type:String,
            max: 255,
            min: 6
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

        pin:{
            type:Number
        },

        // fixed:{
        //     type:JSON
        // },

        custom:{
            type:JSON
        },

        date:{
            type:Date,
            default:Date.now
        }
    
});



module.exports = mongoose.model('CRMFields',CRMFields);