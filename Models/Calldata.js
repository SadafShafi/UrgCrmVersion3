const mongoose = require('mongoose');

const History = new mongoose.Schema({

    
    calledBy:{
        type:String,
        min: 6,
        max: 255
    },
    location:{
        type:String
    },
    calledAt:{
        type:Date
    },
    duration:{
        type:Number
    },
    status:{
        type:[String],
        enum:["hot followup","sales closed","cold followup","appointment fixed",
                "not contacted","contacted","not interested","others","incoming personal","outgoing personal",
                "received","missed","answered"]
    },
    statusDate:{
        type:Date
    },
    // mobNumber:{
    //     type:Number,
    //     required:true
    // },

    date:{
        type:Date,
        default:Date.now
    }

});

const callData = new mongoose.Schema({
        name:{
            type:String,
            min: 6,
            max: 255
        },
        Id:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
            
        },
        email:{
            type:String,
            max: 255,
            min: 6
        },
        mobNumber:{
            type:Number,
            index:true,
            required:true
        },
        status:{
            type:[String],
            enum:["hot followup","sales closed","cold followup","appointment fixed",
            "not contacted","contacted","not interested","others","incoming personal","outgoing personal",
            "received","missed","answered"]
        },
        history:[History],
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
        fixed:{
            type:JSON
        },
        custom:{
            type:JSON
        },
        allocatedTo:{
            type:mongoose.Schema.ObjectId,
            refrence:'User'
        },
        date:{
            type:Date,
            default:Date.now
        }
});

module.exports = mongoose.model('callData',callData);



/*
by:{
                type:String,
                // required:true
            },
            location:{
                type:String
            },
            calledAt:{
                type:Date,
                // required:true
            },
            callEnd:{
                type:Date,
                // required:true
            },
            duration:{
                type:number,
                set:function(){ return (this.callEnd - this.calledAt)}
            },
            followUpOn:{
                type:Date
            },
            status:{
                type:String,
                enum:["Hot Followup","Sales Closed","Cold Followup","Appointment Fixed",
                        "Not contacted","Not interested","Others"]
            },

*/
