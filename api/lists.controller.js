export default class listCtrl {

  static test(req, res, next) {
    try {
      res.status(200).json({ status: "success", message: 'czy to zadziała?' })//.send('czy to zadziała?');
    } catch (e) {
console.log(e);
     return res.status(500).json({ error: e.message });
       }
  }

  // static addList(req, res, next) {
  //   try {

  //   }
  // }

}