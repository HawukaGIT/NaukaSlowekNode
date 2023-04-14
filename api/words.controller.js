import Word from "../db/models/slowka.js";

export default class wordCtrl {
  static async addWord(req, res, next) {
    try {
      const { word, translation, description = "" } = req.body;
      //let interval = 72000000;
      //let repeatTime = Date.now() + interval;
      const newWord = new Word({
        word: word,
        translation: translation,
        description: description,
        //interval: interval,
        //repeatTime: repeatTime,
      });
      const response = await newWord.save();
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
        console.log(`error przy zapisie slowka: ${e}`);
        res.status(500).json(`error: ${e.message}`);
      };
  }

  static async getWords(req, res, next) {
    try {
      const response = await Word.find({});
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
        console.log(`error przy odczycie slówek: ${e}`);
        res.status(500).json(`error: ${e.message}`); 
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
        res.status(500).json(`error: ${e.message}`);
    }
  }

  
}
