import mongoose from "mongoose";
import User from "./user.js";

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  updateTime: { type: Number, default: Date.now() },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});
const List = mongoose.model("List", listSchema);

export default List;
