const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    userID : {type: mongoose.Types.ObjectId,ref:'users' ,required :true},
    trades : {type : Number,default : 1 },
    overallprofit : {type : String },
    image : {type : String ,default : "defaults/default.jpg"},
    startat : {type : String },
    endat : {type :String },
    botstatus : {type :Boolean ,default :"false"},
    admincheck : {type :Boolean ,default :"false"},
    loginId : {type : String ,default :"0"},
    maxpos : {type : Number , default : 1} ,
    lotsize : {type : Number , default : 1 },
    packageID : {type: mongoose.Types.ObjectId,ref:'packages' ,required :true},
    name: { type: String },
    type: { type: String },
    price: { type: Number },
    discount: { type: Number },
    inventoryLimit: { type: String },
    dateVS: { type: Number, default: 0 },
    statusSupport: { type: Boolean, default: false },
    statusVS: { type: Boolean, default: false },
    statusAccSt: { type: Boolean, default: false },
    isDeleted: {type:Boolean,default:false}
},{
    timestamps :true
}
);
module.exports ={
    UsrePackModel : mongoose.model("userpack",Schema)
}