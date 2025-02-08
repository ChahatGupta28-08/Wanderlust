const mongoose=require("mongoose");
const Listing=require("../model/Schema.js");
const initdata=require("./data.js");

main()
.then(()=>
{
console.log("Mongoose Working");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');

}
const init=async()=>
{
 await Listing.deleteMany({});
 initdata.data=initdata.data.map((obj)=>
({
 ...obj,owner:"674ae7ea46863314d4e638d7"
}));
await Listing.insertMany(initdata.data);

 console.log("data was initialised");
}
init();