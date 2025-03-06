const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    family: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    statusActive: { type: Boolean, default: true },
    roles: {
      type: [{ type: mongoose.Types.ObjectId, ref: "roles" }],
      default: [], // Temporarily set empty array, will update in pre-save hook
    },
    token: { type: String, default: "" },
    // plans: { type: [mongoose.Types.ObjectId], ref: 'package', default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to set default role if none is provided
Schema.pre("save", async function (next) {
  if (this.roles.length === 0) {
    const { RolesModel } = require("./roles");
    const defaultRole = await RolesModel.findOne({ title: "USER" }); // Replace 'user' with your desired default role title
    if (defaultRole) {
      this.roles = [defaultRole._id];
    }
  }
  next();
});
module.exports = {
  UserModel: mongoose.model("users", Schema),
};
