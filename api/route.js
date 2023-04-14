import express from "express";
import listCtrl from "./lists.controller.js";
import wordCtrl from "./words.controller.js";
const router = express.Router();

router.route("/api/test").get(listCtrl.test, listCtrl.test2);

router.route("/api/word/").post(wordCtrl.addWord).get(listCtrl.test);
router
  .route("/api/word/:id")
  .get(listCtrl.test)
  .put(listCtrl.test2)
  .delete(listCtrl.test2);

router
  .route("/api/word/")
  .get(listCtrl.test)
  .post(wordCtrl.addWord)
  .put(listCtrl.test2)
  .delete(listCtrl.test2);

router.route("*").get((req, res, next) => {
  res.status(404).send("nieobsługiwany adres");
});

export default router;
