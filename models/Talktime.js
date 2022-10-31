// const { json } = require('body-parser');
const mongoose = require('mongoose');

const talktime = new mongoose.Schema({
        Id:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
            
        },
        totalTalkTime:{
            type:Number,
            required:true
        },
        noCalls:{
            type:Number,
            required:true
        },
        breakTime:{
            type:Number,
            required:true
        },
        idleTime:{
            type:Number,
            required:true
        },
        loginTime:{
            type:Number,
            required:true
        },
        wrapupTime:{
            type:Number,
            required:true
        },
        averageTalktime:{
            type:Number,
            set: function(){
                if( this.NoCalls < 1){
                    denomenator = 1
                }
                else{
                    denomenator = this.noCalls
                }

                return this.totalTalkTime/denomenator;
            }
        }
});

module.exports = mongoose.model('talktime',talktime);