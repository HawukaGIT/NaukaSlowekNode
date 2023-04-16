import Word from "../db/models/word.js";

export default class wordCtrl {
  static async addWord(req, res, next) {
    try {
      const { word, translation, description = "" } = req.body;
      const newWord = new Word({
        word: word,
        translation: translation,
        description: description,
      });
      const response = await newWord.save();
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error przy zapisie slowka: ${e}`);
      res.status(500).json(`add word error: ${e.message}`);
    }
  }

  static async getWords(req, res, next) {
    try {
      const response = await Word.find({});
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error przy odczycie slówek: ${e}`);
      res.status(500).json(`get words error: ${e.message}`);
    }
  }

  static async getWord(req, res, next) {
    try {
      let _id = req.params.id;
      const response = await Word.find({ _id: _id });
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error przy odczycie słówka: ${e}`);
      res.status(500).json(`get word error: ${e.message}`);
    }
  }

  static async updateWord(req, res, next) {
    try {
      let _id = req.params.id;
      const response = await Word.updateOne({ _id: _id }, req.body);
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error funkcji updateWord: ${e}`);
      res.status(500).json(`update word error: ${e.message}`);
    }
  }

  static async deleteWord(req, res, next) {
    try {
      let _id = req.params.id;
      const response = await Word.deleteOne({ _id: _id });
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error funkcji deleteWord: ${e}`);
      res.status(500).json(`delete word error: ${e.message}`);
    }
  }
}
