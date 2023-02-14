import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
  sortCriteria: "All",
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      state.todo.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const index = state.todo.findIndex((todo) => {
        return todo.id === id;
      });
      state.todo[index].task = task;
    },
    toggleComplete: (state, action) => {
      const { id } = action.payload;
      const index = state.todo.findIndex((todo) => {
        return todo.id === id;
      });
      state.todo[index].completed = !state.todo[index].completed;
    },
  },
});
export const todo = (state) => state.todo.todo;
export const sort = (state) => state.todo.sortCriteria;
export const { setTodo, addTodo, sortTodo, updateTodo, toggleComplete } =
  TodoSlice.actions;
export default TodoSlice.reducer;
