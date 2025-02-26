const mongoose = require('mongoose')
const Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    adminId: { type: mongoose.Types.ObjectId, default: undefined },
    email: { type: String, required: true },
    ticketNumber: { type: String },
    image: { type: String },
    statusTick: { type: String, default: 'Open' }, // Open Answered Closed
    topic: { type: String, required: true },
    text: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ticket',
    },
    isFirst: { type: Boolean },
    isUser: { type: Boolean },
    isChecked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // id: false,
    toJSON: {
      virtuals: true,
    },
  },
)
// Middleware to set parentId before saving
Schema.pre('save', function (next) {
  if (!this.parentId) {
    this.parentId = this._id // Set parentId to _id if it's not already set
  }
  next()
})
// Schema.virtual("childern", {
//     ref: "ticket",
//     localField: "_id",
//     foreignField: "parentID"
// })
// function autoPopulate(next) {
//     this.populate([{ path: "childern", select: { __v: 0, id: 0 } }])
//     next();
// }
// Schema.pre("findOne", autoPopulate).pre("find", autoPopulate);
module.exports = {
  TicketModel: mongoose.model('ticket', Schema),
}
