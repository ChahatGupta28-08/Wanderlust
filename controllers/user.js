const User=require("../model/User.js");
module.exports.sign=(req,res)=>
    {
        res.render("./user/signup.ejs");
    }
module.exports.db=async (req,res)=>
{  
    try{
let {username,email,password}=req.body;
       let registeruser=new User({
        email,
        username
       });
      let registertwo=await  User.register(registeruser,password);
      req.login(registertwo,(err)=>
    {
        if(err)
        {
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listing");
       });
    
    }
    catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}    

module.exports.lg=(req,res)=>
    {
        res.render("./user/login.ejs");
    }
module.exports.ldb=async(req,res)=>
    {
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl||"/listing";
    // console.log(redirectUrl);
    res.redirect(redirectUrl);
    } 
module.exports.logoutt=(req,res)=>{
    req.logout((err)=>{
       if(err){
           return next(err);
       }
       req.flash("success","User successfully logout");
       res.redirect("/listing");
   });
}    

