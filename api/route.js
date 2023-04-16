import express from "express";
import listCtrl from "./lists.controller.js";
import wordCtrl from "./words.controller.js";
const router = express.Router();

router.route("/api/word/").post(wordCtrl.addWord).get(wordCtrl.getWords);
router
  .route("/api/word/:id")
  .get(wordCtrl.getWord)
  .put(wordCtrl.updateWord)
  .delete(wordCtrl.deleteWord);

// router
//   .route("/api/word/")
//   .get(listCtrl.test)
//   .post(wordCtrl.addWord)
//   .put(listCtrl.test2)
//   .delete(listCtrl.test2);

router.route("*").get((req, res, next) => {
  res.status(404).send("nieobsługiwany adres");
});

export default router;
