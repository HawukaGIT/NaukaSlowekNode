import express from "express"
import listCtrl from './lists.controller.js'
import wordCtrl from './words.controller.js'
const router = express.Router();

router.route('/api').get(listCtrl.test)
//router.route('/api/word/new').post(listCtrl.addList)

router.route('/api/word/new').post(wordCtrl.addWord)
// router.route()
.get(wordCtrl.testadd)

router.route('*').get((req, res, next) => {
  res.status(404).send('nieobsługiwany adres');
});


export default router