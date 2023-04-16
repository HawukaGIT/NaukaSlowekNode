import User from "../db/models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export default class userCtrl {
  static async getUser(login) {
    console.log(`pobieranie użytkownika: ${login}`);
    try {
      return await User.findOne({ login: login });
    } catch (e) {
      console.error(`Unable to get user: ${e}`);
      return { error: e };
    }
  }

  static async CreateUser(req, res, next) {
    try {
      const { login, email } = req.body;
      //sprawdzenie czy jest już taki user
      const userExist = await this.getUser(login);
      if (userExist)
        return res.status(400).json({
          err: `Login ${login} already exist`,
        });
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      let newUser = new User({
        login: login,
        password: hashedPassword,
        email: email,
      });
      const userresponse = await User.save();
      console.log(userresponse);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async loginUser(req, res, next) {
    try {
      const login = req.body.login;
      //sprawdzenie czy jest taki user
      const user = await ListsDAO.getUser(login);
      if (!user)
        return res.status(400).json({
          err: `Login ${login} not exist`,
        });
      // check if password is corrrect
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).json({
          err: "Invalid password",
        });

      // create and assign a token
      const token = jwt.sign(
        {
          _id: user._id,
          login: user.login,
        },
        process.env["JWT_SECRET"]
      );

      res.json({
        msg: "User logged in",
        token: token,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
