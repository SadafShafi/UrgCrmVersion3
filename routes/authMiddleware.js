const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function auth(req,res,next){
    const token = req.header('auth-token');
    
    console.log("verifying ................... ");
    
    if(!token) 
    {
        console.log("No Token")
        return res.status(401).send('Access Denied');

    }

    try{
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        
        req.user = verified._id;
        req.designation = verified.designation;
        // console.log(req);
        next();
    }catch(err){
        console.log(err)
        res.status(400).send("invalid token");
    }
}

