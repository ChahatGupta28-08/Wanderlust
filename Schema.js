const mongoose=require("mongoose");
const Rating= require("./review.js");
const User=require("./User.js");

const ListingSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
image:{
   url:String,
   filename:String,
},
price:{
    type:Number,
},
location:{
type:String,
},
country:{
    type:String,
},
review:[
{
  type: mongoose.Schema.Types.ObjectId,
  ref:Rating
}],
owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
},

geometry: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category:{
    type:String,
    enum: [
      'Trending',
      'Rooms',
      'Iconic Cities',
      'Mountains',
      'Castles',
      'Amazing Pools',
      'Farms',
      'Arctic'
    ],
    required:true,
  }
});
 ListingSchema.post("findOneAndDelete",async(listing)=>
 {
    if(listing){
     await Rating.deleteMany({_id:{$in:listing.review}});
    }
 } );
const Listing=new mongoose.model("Listing",ListingSchema);
module.exports=Listing;