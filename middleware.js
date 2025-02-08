const Listing=require("./model/Schema.js");
const Rating=require("./model/review.js");
const ExpressError=require("./utils/ExpressError.js");
const{listingSchema,reviewSchema}=require("./schema.js");
module.exports.isLoggin=(req,res,next)=>
{
    req.session.redirectUrl=req.originalUrl;
    
    if(!req.isAuthenticated())
    {
        req.flash("error","User must be logged in");
        res.redirect("/login");
    }
    next();
}    

 module.exports.saveRedirecturl=(req,res,next)=>
 {
    if(req.session.redirectUrl)
 {
    res.locals.redirectUrl=req.session.redirectUrl;
   
 }
 next();  
 }

 module.exports.isOwner=async(req,res,next)=>
 {
    let {id}=req.params;
    let d=await Listing.findById(id);
    if(!d.owner.equals(req.user._id))
    {
        req.flash("error","You are not the owner ");
        res.redirect(`/listing/${id}`);
    }
    next();
 }
 module.exports.isReviewAuthor=async(req,res,next)=>
    {
       let {id,reviewId}=req.params; 
    //    console.log(id);    
       let review= await Rating.findById(reviewId);
    //    console.log(review.author);
       if(!review.author.equals(res.locals.curruser._id))
       {
       
           req.flash("error","You are not the Author of this review ");
           return res.redirect(`/listing/${id}`);
       }
        next();
    }
  module.exports.validateListing=(req,res,next)=>
      {
          let {error}=listingSchema.validate(req.body);
          if(error)
          {
              let errMsg=error.details.map((el)=>el.message).join(",");
              throw new ExpressError(400,errMsg);
          }else{
              next();
          }
      }

    module.exports.validateReview=(req,res,next)=>
        {
            let {error}=reviewSchema.validate(req.body);
           
            if(error)
            {
                
                let errMsg=error.details.map((el)=>el.message).join(",");
                throw new ExpressError(400,errMsg);
            }else{
                next();
            }
           
        } 