const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

module.exports.userController = {
  registration: async (req, res) => {
    try {
      const errors = validationResult(req);
      const msg = errors.errors.map((item) => item.msg);

      if (!errors.isEmpty()) {
        return res.status(401).json({ message: `Ошибка: ${msg}` });
      }

      const { email, password, nickname, isAdmin, todos } = req.body;

      const candidateMail = await User.findOne({ email });

      if (candidateMail) {
        return res
          .status(401)
          .json({ message: `Пользователь ${email} уже существует!` });
      }

      const candidateNick = await User.findOne({ nickname });
      if (candidateNick) {
        return res
          .status(401)
          .json({ message: `Пользователь ${nickname} уже существует!` });
      }

      const hashPassword = await bcrypt.hash(password, 3);

      const user = await User.create({
        email: email,
        password: hashPassword,
        nickname: nickname,
        isAdmin: isAdmin,
        todos: todos,
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: `Ошибка регистрации: ${error.message}` });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password, nickname } = req.body;

      const checkEmail = await User.findOne({ email });
      const checkNickname = await User.findOne({ nickname });

      if (!checkEmail) {
        res.status(401).json("Пользователь с таким Email не найден!");
      }
      if (!checkNickname) {
        res.status(401).json("Пользователь с таким ником не найден!");
      }

      const checkPassword = bcrypt.compareSync(password, checkEmail.password);

      if (!checkPassword) {
        res.status(401).json("Пароль неверный!!!");
      }

      const token = jwt.sign(
        { userId: checkEmail._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      return res.json({ token: token });
    } catch (error) {
      return res.status(400).json({ message: `Ошибка авторизации: ${error.message}` });
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      return  res.status(400).json({ message: `Ошибка: ${error.message}` });
    }
  },
};
