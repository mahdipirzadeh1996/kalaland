const mongoose = require('mongoose')

const RolesSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  },
)

module.exports = {
  RolesModel: mongoose.model('roles', RolesSchema),
}
