const Router = require("express");
const { todosController } = require("../controllers/todos.controller");
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router();

router.get("/todos", todosController.getTodos);
router.get("/todo/:id", todosController.getTodoById);
router.post("/todo", authMiddleware, todosController.addTodo);
router.patch("/todo/:id", authMiddleware, todosController.editTodo);
router.delete("/todo/:id", authMiddleware, todosController.deleteTodo);

module.exports = router;
