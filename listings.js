
const Listing=require("../model/Schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { listSearchIndexes } = require("../model/User.js");
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.createlisting=(req,res)=>
    {   
    res.render("./listing/add.ejs");
    }

module.exports.deletelisting=async (req,res)=>
    {
       let {id}=req.params;
       let q=await Listing.findByIdAndDelete(id);
       req.flash("success","Deleted successfully"); 
       res.redirect("/listing");
   }    

module.exports.index=async(req,res)=>
    {
      let lists=await Listing.find();
      res.render("./listing/index.ejs",{lists});
    }
module.exports.showlisting=async(req,res)=>
    {
    let {id}=req.params;
    let d= await Listing.findById(id)
    .populate({
        path:"review",
        populate:{
        path:"author",
    }
    })
    .populate(
    "owner"
    );
    if(!d)
    {
        req.flash("error","Listing you are deleted no longer exist");
        res.redirect("/listing");
    }
    res.render("./listing/show.ejs",{d});
    }       

module.exports.editlisting=async(req,res)=>
    {
        let {id}=req.params;     
    let d= await Listing.findById(id);
    if(!d)
        {
            req.flash("error","Listing you are deleted no longer exist");
            res.redirect("/listing");
        } 
        let originalImageUrl=d.image.url;
        originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
        res.render("./listing/edit.ejs",{d,originalImageUrl});
    }   
    
module.exports.editl=async (req,res)=>
    {
        let {id}=req.params;
        let d= await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
        if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
         d.image={url,filename}; 
         await d.save();
        }
        req.flash("success","Edited successfully"); 
        res.redirect(`/listing/${id}`)
    }    
module.exports.add=async (req,res,next)=>
    {
        let response=await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 2
          })
            .send();
          
        let url=req.file.path;
        let filename=req.file.filename;
       const newListing=new Listing(req.body.listing);
      
       newListing.owner=req.user._id;
       newListing.image={url,filename};
       newListing.geometry=response.body.features[0].geometry;
       let savedListing=await newListing.save();
       
     req.flash("success","Listing created successfully");   
    res.redirect("/listing");
    } 
module.exports.logoutlisting=(req,res)=>
    {
        req.flash("success","Logout successfully");
        res.render("/listing");
    }  
module.exports.filterlisting=async (req,res)=>
    {
        let {filter}=req.params;
        let lists=await Listing.find({category:filter});
        res.render("./listing/index.ejs",{lists});

    }  