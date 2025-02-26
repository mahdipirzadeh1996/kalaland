const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    date: { type: Date },
    type: { type: Boolean, default: true },
    userID: { type: [mongoose.Types.ObjectId] },
    title: { type: String, required: true },
    descri: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
}
);
module.exports = {
    NotifModel: mongoose.model("notif", Schema)
}