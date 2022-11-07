const mongoose = require('mongoose');

const Desi = new mongoose.Schema({

    designation:{
        type:String,
    },
    by : {
        type:mongoose.Schema.ObjectId,
        refrence:'User'
    }
});

module.exports = mongoose.model('Desi',Desi);