const mongoose = require('mongoose')
const Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    status: { type: Boolean, default: false },
    txn_id: { type: String, required: true },
    paymentDate: { type: String, required: true },
    latitude: { type: Number, required: true, required: true },
    longitude: { type: Number, required: true, required: true },
    amount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  PaymentModel: mongoose.model('payment', Schema),
}
