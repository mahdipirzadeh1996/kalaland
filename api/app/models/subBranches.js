const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    parentBranch: { type: mongoose.Types.ObjectId, ref: 'branch', required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  SubBranchesModel: mongoose.model('subBranches', Schema),
}
