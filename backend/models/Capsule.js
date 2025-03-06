const mongoose = require("mongoose");

const CapsuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  media: [{ type: String }],
  lockDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New field for collaborators
  createdAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Capsule", CapsuleSchema);
