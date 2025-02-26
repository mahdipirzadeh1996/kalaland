const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    family: { type: String, required: true }, 
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    statusActive: { type: Boolean, default: true },
    roles: { type: [mongoose.Types.ObjectId], ref: 'roles', required: true },
    token: { type: String, default: '' },
    // plans: { type: [mongoose.Types.ObjectId], ref: 'package', default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
module.exports = {
  UsersModel: mongoose.model('users', Schema),
}
