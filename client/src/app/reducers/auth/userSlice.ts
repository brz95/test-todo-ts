import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { getUsers, loginUser, regUser } from "./ActionCreators";

interface UserState {
  users: IUser[];
  token: string | null;
  id: string | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: "",
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(regUser.pending.type, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      regUser.fulfilled.type,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload;
      }
    );
    builder.addCase(
      regUser.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(loginUser.pending.type, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      loginUser.fulfilled.type,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload;
      }
    );
    builder.addCase(
      loginUser.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getUsers.pending.type, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getUsers.fulfilled.type,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload;
      }
    );
    builder.addCase(
      getUsers.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default UserSlice.reducer;
