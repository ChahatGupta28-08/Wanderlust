const passportLocalMongoose = require('passport-local-mongoose');
const mongoose=require("mongoose");
// main()
// .then(()=>
// {
// console.log("Mongoose Working");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
// }
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
       
    }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);