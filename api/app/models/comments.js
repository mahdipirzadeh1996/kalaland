const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  CommentsModel: mongoose.model('comments', Schema),
}
