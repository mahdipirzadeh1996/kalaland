const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    count: { type: Number, default: 1, required: true },
    ammount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  BascketModel: mongoose.model('bascket', Schema),
}
