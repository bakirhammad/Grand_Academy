const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  // role: { type: mongoose.Schema.Types.ObjectId, ref: "Role"},
});

// To hash password
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();

  this.password = await bcrypt.hash(this.password, 9);
});

module.exports = mongoose.model("User", userSchema);
