import mongoose from "mongoose";
import User from "./user.js";
import List from "./list.js";

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  description: String,
  interval: { type: Number, default: 72000000 },
  lists: { type: [mongoose.Schema.Types.ObjectId], ref: List },
  translation: { type: String, required: true },
  repeatTime: { type: Number, default: Date.now() + 72000000 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: User },
});
const Word = mongoose.model("Word", wordSchema);

export default Word;
