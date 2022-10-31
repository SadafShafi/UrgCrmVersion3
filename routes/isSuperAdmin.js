module.exports = function isSuperAdmin(req,res,next){
    console.log(req.designation.includes('superadmin'));
    if(req.designation.includes('superadmin')){
        console.log("Super Admin spotted")
        next();
    }
    else{
        console.log("Super admin not tru")
        res.send("Access denied : Not the Super Admin");
    }
}