const Router = require("express");
const { userController } = require("../controllers/users.controller");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const router = new Router();

router.post(
  "/reg",
  [
    check("nickname", "Ник не может быть пустым\n").notEmpty(),
    check("email", "Email не может быть пустым\n").notEmpty(),
    check("email", "Используйте Email!\n").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым\n").notEmpty(),
    check(
      "password",
      "Пароль не может быть меньше 3 и больше 6 символов\n"
    ).isLength({ min: 3, max: 6 }),
  ],
  userController.registration
);

router.post("/login", [
  check("nickname", "Ник не может быть пустым\n").notEmpty(),
  check("password", "Пароль не может быть пустым\n").notEmpty(),
  check(
    "password",
    "Пароль не может быть меньше 3 и больше 6 символов\n"
  ).isLength({ min: 3, max: 6 }),
],userController.login);

router.get("/users", userController.getUser);

module.exports = router;
