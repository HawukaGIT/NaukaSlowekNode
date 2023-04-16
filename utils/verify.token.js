import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.header('Authentication');
  if (!token)
    return res.status(401).json({
      msg: 'Access Denied!',
    });
  try {
    const verified = jwt.verify(token, process.env['JWT_SECRET']);
    next();
  } catch (err) {
    return res.status(401).json({
      err,
    });
  }
};