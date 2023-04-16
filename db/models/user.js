import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  email: String,
  createDate: { type: Date, default: new Date() },
  lastLoginDate: { type: Date, default: new Date() },
  role: { type: [String], default: ["user"] },
});
const User = mongoose.model("User", userSchema);

export default User;
