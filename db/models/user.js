import mongoose from "mongoose";
import Role from "./role.js";

const userSchema = new mongoose.Schema({
  login: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  email: String,
  createDate: { type: Date, default: new Date() },
  lastLoginDate: { type: Date },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Role,
    },
  ],
});
const User = mongoose.model("User", userSchema);

export default User;
