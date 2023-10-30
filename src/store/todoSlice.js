import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    chosenTaskIndex: null,
  },
  reducers: {
    toggleCheckbox(state, action) {
      state.todos[action.payload[0]].exercise[action.payload[1]].checked =
        !state.todos[action.payload[0]].exercise[action.payload[1]].checked;
    },
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    changeChosenTask(state, action) {
      state.chosenTaskIndex = action.payload;
    },
    deleteTodo(state, action) {
      state.todos.splice(action.payload, 1);
    },
    editTodo(state, action) {
      state.todos.splice(action.payload[0], 1, action.payload[1]);
    },
  },
});

export default todoSlice.reducer;
export const {
  toggleCheckbox,
  addTodo,
  changeChosenTask,
  deleteTodo,
  editTodo,
} = todoSlice.actions;
