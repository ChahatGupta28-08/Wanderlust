const Listing=require("../model/Schema.js");
const Rating=require("../model/review.js");

module.exports.postingreview=async(req,res)=>
    {
       let listing=await Listing.findById(req.params.id);
       let newReview=new Rating(req.body.review);
       newReview.author=req.user._id;
       listing.review.push(newReview);
       await newReview.save();
       await listing.save();
       req.flash("success"," Review Inserted successfully"); 
       res.redirect(`/listing/${req.params.id}`);
    }
module.exports.deletereview=async (req,res)=>
    {
    let {id,reviewId}=req.params;
    let del=await Rating.findByIdAndDelete(reviewId);
    req.flash("success"," Review Deleted successfully"); 
    res.redirect(`/listing/${req.params.id}`);
    } 