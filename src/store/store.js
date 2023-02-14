import TodoReducer from "./TodoSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});

export default store;
