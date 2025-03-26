/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoCompletedCategory } from '../types/todoCompletedCategory';

const initialState = {
  query: '',
  category: TodoCompletedCategory.all,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery(filter, { payload }: PayloadAction<string>) {
      filter.query = payload;
    },
    changeStatus(filter, { payload }: PayloadAction<TodoCompletedCategory>) {
      filter.category = payload;
    },
  },
});
