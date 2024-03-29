import express from "express";
import listCtrl from "./lists.controller.js";
import wordCtrl from "./words.controller.js";
import userCtrl from "./users.controller.js";
import VerifyToken from "../utils/verify.token.js";
const router = express.Router();

router.route("/test").get((req, res) => {
  res.writeHead(200);
  res.end("I'm HTTPS-enabled!");
});

router.route("/api/auth/signup/").post(userCtrl.CreateUser);
router.route("/api/auth/signin/").post(userCtrl.loginUser);
router.route("/api/auth/logout/").post(VerifyToken, userCtrl.logoutUser);

router
  .route("/api/word/")
  .all(VerifyToken)
  .post(wordCtrl.addWord)
  .get(wordCtrl.getWords);
router
  .route("/api/word/:id")
  .all(VerifyToken)
  .get(wordCtrl.getWord)
  .put(wordCtrl.updateWord)
  .delete(wordCtrl.deleteWord);

router
  .route("/api/list/")
  .all(VerifyToken)
  .get(listCtrl.getLists)
  .post(listCtrl.addList);

router
  .route("/api/list/:id")
  .all(VerifyToken)
  .get(listCtrl.getList)
  .put(listCtrl.updateList)
  .delete(listCtrl.deleteList);

router.route("*").get((req, res, next) => {
  res.status(404).send("nieobsługiwany adres");
});

export default router;
