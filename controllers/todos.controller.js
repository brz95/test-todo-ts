const Todo = require("../models/Todo.model");
const User = require("../models/User.model");

module.exports.todosController = {
  addTodo: async (req, res) => {
    try {
      const { text, done, user } = req.body;
      const addTodo = await Todo.create({
        text,
        done,
        user,
      });
      return res.json(addTodo);
    } catch (error) {
      return res.status(400).json({ message: `Ошибка: ${error.message}` });
    }
  },

  editTodo: async (req, res) => {
    try {
      const { text, done } = req.body;

      await Todo.findByIdAndUpdate(req.params.id, {
        text,
        done,
      });
      const editTodo = await Todo.findById(req.params.id);
      return res.json(editTodo);
    } catch (error) {
      return res.status(400).json({ message: `Ошибка: ${error.message}` });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
      return res.json(deleteTodo);
    } catch (error) {
      return res.status(400).json({ message: `Ошибка: ${error.message}` });
    }
  },

  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      return res.json(todos);
    } catch (error) {
      return res.status(400).json({ message: `Ошибка: ${error.message}` });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const getTodoById = await Todo.findById(req.params.id);
      return res.json(getTodoById);
    } catch (error) {
      return res.status(400).json({ message: `Ошибка: ${error.message}` });
    }
  },
};
