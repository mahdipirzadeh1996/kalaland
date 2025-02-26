const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresIn: { type: Number, required: true }
}
);
module.exports = {
    CodeModel: mongoose.model("code", Schema)
}