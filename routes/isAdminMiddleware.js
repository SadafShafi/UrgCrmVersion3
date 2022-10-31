module.exports = function isAdmin(req,res,next){
    console.log(req.designation.includes('admin'));
    if(req.designation.includes('admin')){
        console.log("Admin spotted")
        next();
    }
    else{
        console.log("admin not tru")
        res.send("Access denied : Not an Admin");
    }
}