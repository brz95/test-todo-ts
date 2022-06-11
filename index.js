const express = require("express");
const mongoose = require("mongoose");
const PORT = 3434;
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(require("./routes/auth.route"));
app.use(require("./routes/todos.route"));

const server = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_DB_SERVER)
      .then(() => console.log("Успешное соединение..."))
      .catch(() => console.log("Пал хила"));

    app.listen(PORT, () =>
      console.log("Сервер запущен на: http://localhost:3434")
    );
  } catch (error) {
    console.log(`Не работает прикинь`);
  }
};

server();
