const Router = require("express");
const { userController } = require("../controllers/users.controller");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const router = new Router();

router.post(
  "/reg",
  [
    check("nickname", "NickName не может быть пустым").notEmpty(),
    check("email", "Email не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль не может быть меньше 3 и больше 6 символов"
    ).isLength({ min: 3, max: 6 }),
  ],
  userController.registration
);

router.post("/login", userController.login);

router.get("/users", authMiddleware, userController.getUser);

module.exports = router;
