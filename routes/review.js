const express=require("express");
const router=express.Router({mergeParams:true});
const app=express();
const path=require("path");
const ejs=require("ejs");
const methodOverride=require("method-override");
const wrapAsync=require("../utils/wrapAsync.js")
app.use(methodOverride("_method"));
const Listing=require("../model/Schema.js");
const Rating=require("../model/review.js");
const {reviewSchema}=require("../schema.js");
const {isLoggin,isReviewAuthor,validateReview}=require("../middleware.js");
const ExpressError=require("../utils/ExpressError.js");
const ReviewController=require("../controllers/reviews.js");
 

router.post("/",isLoggin,validateReview,wrapAsync(ReviewController.postingreview));
//Delete Review
router.delete("/:reviewId",isLoggin,isReviewAuthor,wrapAsync(ReviewController.deletereview));

module.exports=router;