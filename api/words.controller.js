import WordModel from '../db/models/slowka.js'

export default class wordCtrl {

  static async addWord (req, res, next) {
    try{
      const {word, translation} = req.body
    const newWord = new WordModel ({
      word: word,
        translation: translation
    });
      const response = await newWord.save();
      console.log(response);
    }
  catch{e => {
    console.log(`error przy zapisie slowka: ${e}`);
  }
       }
  }

  static async testadd (req, res, next) {
let newWord
    try{
    newWord = new WordModel ({
      word: "sun",
        translation: "translation"
    });
  await newWord.save();
      console.log(newWord);
    }
  catch{e => {
    console.log(`error przy tescie zapisu slowka: ${e}`);
  }
       }
  } 
  
}