const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    description: { type: String, required: true },
    branch: { type: mongoose.Types.ObjectId, ref: 'branches', required: true },
    subBranch: {
      type: mongoose.Types.ObjectId,
      ref: 'subBranches',
      required: true,
    },
    buyPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    image: { type: String, required: true },
    storage: { type: Number, required: true },
    off: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  ProductsModel: mongoose.model('products', Schema),
}
