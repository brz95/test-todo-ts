const { Schema, model } = require("mongoose");

const todoSchema = Schema({
  text: String,
  done: {
    type: Boolean,
    default: false,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;
