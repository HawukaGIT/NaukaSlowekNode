import User from "../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Role from "../db/models/role.js";
dotenv.config();

export default class userCtrl {
  static async getUser(login) {
    try {
      console.log("getUser");
      return await User.findOne({ login: login });
    } catch (e) {
      console.error(`Unable to get user: ${e}`);
      return { error: e };
    }
  }

  static async CreateUser(req, res, next) {
    try {
      console.log("CreateUser");
      const { login, email, password } = req.body;
      //sprawdzenie czy jest już taki user
      const userExist = await userCtrl.getUser(login);
      if (userExist)
        return res.status(400).json({
          err: `Login ${login} already exist`,
        });
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const role = await Role.findOne({ name: "user" });

      let newUser = new User({
        login: login,
        password: hashedPassword,
        email: email,
        roles: [role],
      });
      const userresponse = await newUser.save();
      console.log(userresponse);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async loginUser(req, res, next) {
    try {
      console.log("loginUser");
      const login = req.body.login;
      //sprawdzenie czy jest taki user
      const user = await userCtrl.getUser(login);
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
      let maxAge = 60 * 1000;
      res
        .cookie("token", token, {
          maxAge: maxAge,
          httpOnly: true,
          signed: true,
        })
        .cookie("user", user.login, { maxAge: maxAge });
      res.json({
        msg: `User ${user.login} logged in`,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async logoutUser(req, res, next) {
    try {
      console.log("logoutUser");
      let token = 0;
      let maxAge = 0;
      res
        .cookie("token", token, {
          maxAge: maxAge,
          httpOnly: true,
          signed: true,
        })
        .cookie("user", "", { maxAge: maxAge });
      res.json({
        msg: `You logged out`,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  isAdmin = (req, res, next) => {
    console.log("isAdmin");
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };
}
