import List from "../db/models/list.js";

export default class listCtrl {
  static async addList(req, res, next) {
    try {
      const { name, description = "" } = req.body;
      const newList = new List({
        name: name,
        description: description,
      });
      const response = await newList.save();
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error przy zapisie listy: ${e}`);
      res.status(500).json(`add list error: ${e.message}`);
    }
  }

  static async getLists(req, res, next) {
    try {
      const response = await List.find({});
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error przy odczycie list: ${e}`);
      res.status(500).json(`get lists error: ${e.message}`);
    }
  }

  static async getList(req, res, next) {
    try {
      let _id = req.params.id;
      const response = await List.find({ _id: _id });
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error przy odczycie listy: ${e}`);
      res.status(500).json(`get list error: ${e.message}`);
    }
  }

  static async updateList(req, res, next) {
    try {
      let _id = req.params.id;
      const response = await List.updateOne({ _id: _id }, req.body);
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error funkcji updateList: ${e}`);
      res.status(500).json(`update list error: ${e.message}`);
    }
  }

  static async deleteList(req, res, next) {
    try {
      let _id = req.params.id;
      const response = await List.deleteOne({ _id: _id });
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      console.log(`error funkcji deleteList: ${e}`);
      res.status(500).json(`delete list error: ${e.message}`);
    }
  }
}
