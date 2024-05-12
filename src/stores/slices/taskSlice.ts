import { createSlice } from '@reduxjs/toolkit';

import { TaskState } from '../types/task';
import { RootState } from '../types/root';
import {
  putUpdateTask,
  getTasks,
  deleteTask,
  postAddTask,
} from '@/api/services/task';

const initialTaskState: TaskState = {
  task: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialTaskState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.task = action.payload || [];
    });
    builder.addCase(postAddTask.fulfilled, (state, action) => {
      state.task = [...state.task, ...[action.payload]];
    });
    builder.addCase(putUpdateTask.fulfilled, (state, action) => {
      const findIndexTask = state.task.findIndex(
        (item, index) => item.id === action.payload.id,
      );

      if (findIndexTask !== -1) {
        state.task[findIndexTask] = action.payload;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const newTask = state.task.filter(item => item.id !== action.payload.id);
      state.task = newTask;
    });
  },
});

export const { reducer: taskReducer, actions: taskActions } = taskSlice;

export const getTaskState = (state: RootState) => state.task;
