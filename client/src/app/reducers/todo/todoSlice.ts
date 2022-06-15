import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../../models/ITodo";
import { addTodo, fetchTodos } from './TodoCreators'

interface TodoState {
  todos: ITodo[];
  loading: boolean;
  error: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
}

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTodo.pending.type, (state) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(addTodo.fulfilled.type, (state, action: PayloadAction<ITodo[]>) => {
      state.loading = false;
      state.error = "";
      state.todos = action.payload;
    })
    builder.addCase(addTodo.rejected.type, (state, action:  PayloadAction<string>)=> {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(fetchTodos.pending.type, (state) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(fetchTodos.fulfilled.type, (state, action: PayloadAction<ITodo[]>) => {
      state.loading = false;
      state.error = "";
      state.todos = action.payload;
    })
    builder.addCase(fetchTodos.rejected.type, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
})
export default TodoSlice.reducer;
