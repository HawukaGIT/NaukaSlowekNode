import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: String,
  description: String,
  interval: Number,
  //lists: [Schema.Types.ObjectId],
  translation: String,
  date: { type: Date, default: Date.now },
  //owner: ObjectId(),
});
const Word = mongoose.model("Word", wordSchema);

export default Word;
