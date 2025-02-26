const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    userID: { type: mongoose.Types.ObjectId,ref:'user', required: true },
    status: { type: Boolean, default: false },
    txn_id: { type: String},
    myQrCode: { type: String },
    paymentDate:{type:String},
    address: { type: String,required: true },
    amount: { type: Number },
    description: { type: String },
    invoicenumber: { type: String },
    rewards: { type: [mongoose.Types.ObjectId] ,ref:'reward'},
    transactionHash: { type: String, default: undefined },
    isDeleted: {type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);
module.exports = {
  WithdrawModel: mongoose.model("withdraw", Schema),
};
