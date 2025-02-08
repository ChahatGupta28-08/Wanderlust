if(process.env.NODE_ENV!="production")
{
    require("dotenv").config();
}


const express=require("express");
const app=express();
const path=require("path");
const ejs=require("ejs");
const methodOverride=require("method-override");
const eng = require('ejs-mate');
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const mongoose=require("mongoose");
app.use(methodOverride("_method"));
const Listing=require("./model/Schema.js");
const Rating=require("./model/review.js");
const listing=require("./routes/list.js");
const review=require("./routes/review.js");
const user=require("./routes/users.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const User = require("./model/User.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
//Connect
const dbUrl=process.env.ATLASDB_URL;
main()
.then(()=>
{
console.log("Mongoose Working");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

}

const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>
{
console.log("Error in Mongo SESSION Store",err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,

    },
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.session());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>
{
res.locals.success=req.flash("success");
res.locals.error=req.flash("error");
res.locals.curruser=req.user;
next();
});



app.engine("ejs", eng);

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.listen(8080,()=>
{
console.log("Server is listening");
});
//Router
app.use("/listing",listing);
app.use("/listing/:id/review",review);
app.use("/",user);



app.all("*",(req,res,next)=>{
 next(new ExpressError(404,"Page not found!"));
});
app.use((err,req,res,next)=>
{
let {status=500,message="Something Went wrong"}=err;
res.render("./listing/error.ejs",{err});
//  res.status(status).send(message);
});