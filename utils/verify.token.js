import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.signedCookies.token;
  // console.log("signed cookies:", req.signedCookies);
  // console.log("not signed cookies:", req.cookies);

  if (!token)
    return res.status(401).json({
      msg: "Access Denied!",
    });
  try {
    const verified = jwt.verify(
      token,
      process.env["JWT_SECRET"],
      (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded._id;
        let maxAge = 2 * 24 * 60 * 1000;
        res
          .cookie("token", token, {
            maxAge: maxAge,
            httpOnly: true,
            signed: true,
            SameSite: None,
          })
          .cookie("user", decoded.login, { maxAge: maxAge, SameSite: None });
        next();
      }
    );
  } catch (err) {
    return res.status(401).json({
      err,
    });
  }
};
export default verifyToken;
