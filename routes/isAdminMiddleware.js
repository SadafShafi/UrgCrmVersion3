module.exports = function isAdmin(req,res,next){
    // console.log(req.designation.includes('admin'));
    console.log(req.designation)
    if(req.designation.length > 1 && req.designation.includes('admin')){
        console.log("Admin spotted")
        next();
    }
    else{
        console.log("admin not tru")
        res.send("Access denied : Not an Admin");
    }
}