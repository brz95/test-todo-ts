import { createAsyncThunk } from "@reduxjs/toolkit";

const serverURL = "http://localhost:3434";

export const regUser = createAsyncThunk(
  "user/reg",
  async (
    data: { email: string; password: string; nickname: string },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${serverURL}/reg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        }),
      });
      const user = await response.json();

      if (user.error) {
        return thunkApi.rejectWithValue(user.error);
      }

      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: { nickname: string; password: string }, thunkApi) => {
    try {
      const response = await fetch(`${serverURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: data.nickname,
          password: data.password,
        }),
      });

      const user = await response.json();
      
      if (response.ok === false) {
        return thunkApi.rejectWithValue(user.error);
      }

      if (response.ok) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.id);
        return thunkApi.fulfillWithValue(user);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    localStorage.clear();
  }
);

export const getUsers = createAsyncThunk('get/users', async(_, thunkApi) => {
  try {
    const response = await fetch(`${serverURL}/users`)
    const users = response.json()
    console.log(users);
    
  } catch (error) {
    return thunkApi.rejectWithValue(error);

  }
})