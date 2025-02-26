const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String },
    description: { type: String }, 
    image: { type: String, default: "/defaults/default.jpg" },
    author : { type: mongoose.Types.ObjectId ,ref:'users', required :true },
    isDeleted: {type:Boolean,default:false}
}, {
    timestamps: true
}
);
module.exports = {
    NewsModel: mongoose.model("news", Schema)
}