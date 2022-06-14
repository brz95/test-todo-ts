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
        return res.status(401).json({ error: `Ошибка: ${msg}` });
      }

      const { email, password, nickname, isAdmin, todos } = req.body;

      const candidateMail = await User.findOne({ email });

      if (candidateMail) {
        return res
          .status(401)
          .json({ error: `Пользователь ${email} уже существует!` });
      }

      const candidateNick = await User.findOne({ nickname });
      if (candidateNick) {
        return res
          .status(401)
          .json({ error: `Пользователь ${nickname} уже существует!` });
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
      return res
        .status(400)
        .json({ error: `Ошибка регистрации: ${error.message}` });
    }
  },

  login: async (req, res) => {
    try {
      const { password, nickname } = req.body;

      const checkNickname = await User.findOne({nickname});

      if (!checkNickname) {
        return res.status(401).json({error: "Пользователь с таким ником не найден!"});
      }

      const checkPassword = bcrypt.compareSync(
        password,
        checkNickname.password
      );

      if (!checkPassword) {
       return res.status(401).json({error: "Пароль неверный"});
      }

      const token = jwt.sign(
        { userId: checkNickname._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      return res.json({ token: token, id: checkNickname._id });
    } catch (error) {
      return res
        .status(400)
        .json({ error: `Ошибка авторизации: ${error.message}` });
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      return res.status(400).json({ error: `Ошибка: ${error.message}` });
    }
  },
};
