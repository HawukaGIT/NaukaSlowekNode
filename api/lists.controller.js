export default class listCtrl {
  static test(req, res, next) {
    try {
      console.log("funkcja test...");
      //res.status(200).json({ status: "success", message: 'czy to zadziała?' })//.send('czy to zadziała?');
      next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }

  static test2(req, res, next) {
    try {
      console.log("funkcja test2...");
      res.status(200).json("Poszly dwie funkcje");
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }
}
