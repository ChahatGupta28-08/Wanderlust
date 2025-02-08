const mongoose=require("mongoose");

const ReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
       
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            },

    });
    const Rating=new mongoose.model("Rating",ReviewSchema);
    module.exports=Rating;