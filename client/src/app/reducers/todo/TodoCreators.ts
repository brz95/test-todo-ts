import { createAsyncThunk } from "@reduxjs/toolkit";

const serverURL = "http://localhost:3434";

export const addTodo = createAsyncThunk(
  "add/todo",
  async (data: { text: string; user: string | null }, thunkApi) => {
    try {
      const response = await fetch(`${serverURL}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          text: data.text,
          user: data.user,
        }),
      });

      const todo = await response.json();
      if (!response.ok) {
        return thunkApi.rejectWithValue(todo.error);
      }
      return thunkApi.fulfillWithValue(todo);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchTodos = createAsyncThunk("get/todos", async (_, thunkApi) => {
  try {
    const response = await fetch(`${serverURL}/todos`);
    const todos = await response.json();

    if (!response.ok) {
      return thunkApi.rejectWithValue(todos.error);
    }

    return thunkApi.fulfillWithValue(todos);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
