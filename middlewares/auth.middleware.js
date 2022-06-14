const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Вы не авторизованы!" });
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodeData;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Пользователь не авторизован" });
  }
};
