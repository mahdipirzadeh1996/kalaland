const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    username : { type : String , required :true},
    name : { type: String, required :true },
    image : { type : String ,default : "/defaults/default.jpg"},
    video : { type : String , default :"salam" }
},{
    timestamps :true
}
);
module.exports ={
    KycModel : mongoose.model("kyc",Schema)
}