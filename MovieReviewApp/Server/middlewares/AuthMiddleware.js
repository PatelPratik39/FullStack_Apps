const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decrypyedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decrypyedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};
