import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("signed cookies:", req.signedCookies);
  console.log("not signed cookies:", req.cookies);
  //console.log(req);
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
