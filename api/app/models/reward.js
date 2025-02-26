const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  refID: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  buyerName: { type: String, required: true },
  amount: { type: String, required: true },
  checkout: { type: Boolean, default: false }, // درخواست برداشت داده یا نه
  received: { type: Boolean, default: false }, // ادمین واریز کرده یا نه=
},
{
  timestamps: true,
});
module.exports = {
  RewardModel: mongoose.model("reward", Schema),
};
