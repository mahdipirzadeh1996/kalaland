const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  ascii: { type: String, required: true },
  hex: { type: String, required: true },
  base32: { type: String, required: true },
  otpauth_url: { type: String, required: true },
  status: { type: Boolean, default: false },
});
module.exports = {
  GoogleAuthModel: mongoose.model("googleAuth", Schema),
};
