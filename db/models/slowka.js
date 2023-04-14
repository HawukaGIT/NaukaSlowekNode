import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: String,
  description: String,
  interval: { type: Number, default: 72000000 },
  //lists: [Schema.Types.ObjectId],
  translation: String,
  repeatTime: { type: Number, default: Date.now() + 72000000 },
  //owner: ObjectId(),
});
const Word = mongoose.model("Word", wordSchema);

export default Word;
