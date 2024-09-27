import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    updateTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.text = text;
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
