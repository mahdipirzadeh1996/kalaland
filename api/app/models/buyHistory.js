const mongoose = require('mongoose')
const Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    productId: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
    paymentId: {
      type: mongoose.Types.ObjectId,
      ref: 'payments',
      required: true,
    },
    location: { type: Location, required: true },
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  BuyHistorytModel: mongoose.model('buyHistory', Schema),
}
