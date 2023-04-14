import Word from "../db/models/slowka.js";

export default class wordCtrl {
  static async addWord(req, res, next) {
    try {
      const { word, translation, description = "" } = req.body;
      let interval = 20;
      let date = interval;
      const newWord = new Word({
        word: word,
        translation: translation,
        description: description,
        interval: interval,
        date: 
      });
      const response = await newWord.save();
      console.log(response);
    } catch {
      (e) => {
        console.log(`error przy zapisie slowka: ${e}`);
      };
    }
  }

//   static async testadd(req, res, next) {
//     let newWord;
//     try {
//       newWord = new Word({
//         word: "t-shirt",
//         translation: "koszula",
//       });
//       await newWord.save();
//       console.log(newWord);
//       let { word, translation, description = "" } = newWord;
//       res
//         .status(200)
//         .send(`dodano słowo: ${word} - ${translation} (${description})`);
//     } catch {
//       (e) => {
//         console.log(`error przy tescie zapisu slowka: ${e}`);
//       };
//     }
//   }

}
