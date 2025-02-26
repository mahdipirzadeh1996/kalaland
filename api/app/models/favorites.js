const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    productId: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  BranchModel: mongoose.model('branch', Schema),
}
