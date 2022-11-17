const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config()

//Routes
const authRoutes = require('./routes/auth');
const admin = require('./routes/admin');
const superAdmin = require('./routes/superAdmin');
const crmfields = require('./routes/crmform');
const talktime = require('./routes/talktimedata');
const defineCRMfields = require('./routes/defineCRMfields');
const callData = require('./routes/callData');
const templates = require('./routes/templates');
const eod = require('./routes/eod');
const resetpassword = require('./routes/resetPassword');

//MiddleWares
const authToken = require('./routes/authMiddleware');
const isAdmin = require('./routes/isAdminMiddleware');
const isSuperAdmin = require('./routes/isSuperAdmin');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.raw());


// Authorization Routes
app.use('/auth',authRoutes);
// app.use('/crmform',crmfields);        // not needed , call data does the same 
app.use("/talktime",authToken,talktime);
app.use('/defineCRM',authToken,defineCRMfields);
app.use('/calldata',authToken,callData);
app.use('/templates',authToken,templates);
app.use('/eod',authToken,eod);
app.use('/admin',authToken,isAdmin,admin);
app.use('/superadmin',authToken,isSuperAdmin,superAdmin);
app.use('/resetpassword',resetpassword);

app.get('/',(req,res)=>res.send("<h1>Wel Come to URG CRM</h1>"));
mongoose.connect(process.env.LINK_DB,()=>console.log("connected to BD"))
app.listen(process.env.PORT ||  3012,()=>console.log(`Listning to port 3000`));
