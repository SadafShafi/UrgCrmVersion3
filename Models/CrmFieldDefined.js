// const { json } = require('body-parser');
const mongoose = require('mongoose');

const CRMFieldsDefined = new mongoose.Schema({


        // fixed:{
        //     type:JSON
        // },

        custom:{
            type:JSON
        },
        by:{
            type:mongoose.Schema.ObjectId,
            refrence:'User'
        },
        date:{
            type:Date,
            default:Date.now
        }
    
});



module.exports = mongoose.model('CRMFieldsDefined',CRMFieldsDefined);