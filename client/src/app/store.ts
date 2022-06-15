import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/auth/userSlice'
import todoReducer from './reducers/todo/todoSlice'

const rootReducer = combineReducers({
  userReducer, todoReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']