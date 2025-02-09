const express=require("express");
const router=express.Router();
const app=express();
const path=require("path");
const ejs=require("ejs");
const methodOverride=require("method-override");
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {isOwner}=require("../middleware.js");
app.use(methodOverride("_method"));
const Listing=require("../model/Schema.js");
const Rating=require("../model/review.js");
const {isLoggin,validateListing}=require("../middleware.js");
const {listingSchema,ReviewSchema}=require("../schema.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const { storage }=require("../cloudConfig.js");
const upload = multer({storage});
 //Create Route    
router.get("/new",isLoggin,listingController.createlisting);
router
.route("/")
.get(wrapAsync(listingController.index))
 .post(upload.single("listing[image]"),validateListing,wrapAsync(listingController.add));

 router
.route("/filter/:filter")
.get(wrapAsync(listingController.filterlisting));

router
.route("/:id")
.get(wrapAsync(listingController.showlisting))
.put(isLoggin,upload.single("listing[image]"),validateListing,wrapAsync(listingController.editl))
.delete(isOwner,isLoggin,wrapAsync(listingController.deletelisting));
//Edit Route
    router.get("/:id/edit",isOwner,isLoggin,wrapAsync(listingController.editlisting));
//logout route
router.get("/logout",listingController.logoutlisting)

//router export
        module.exports=router;
