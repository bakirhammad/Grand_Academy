const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseTitle: { type: String, required: true },
  courseBody: { type: String, required: true },
  courseDate: { type: Date, default: Date.now() },
  courseImage: { type: String },
  courseDuration: { type: Number, required: true },
});

module.exports = mongoose.model("Course", courseSchema);
