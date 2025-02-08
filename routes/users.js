const express=require("express");
const router=express.Router();
const app=express();
const ejs=require("ejs");

const passport=require("passport");
const flash=require("connect-flash");
const {saveRedirecturl}=require("../middleware.js");
const UserController=require("../controllers/user.js");


router
.route("/signup")
.get(UserController.sign)
.post(UserController.db);

router
.route("/login")
.get(UserController.lg)
.post(saveRedirecturl,passport.authenticate("local",
    {
     failureRedirect:"/login",
     failureFlash:true,
     }),UserController.ldb,
  ); 

router.get("/logout",UserController.logoutt);

module.exports=router;