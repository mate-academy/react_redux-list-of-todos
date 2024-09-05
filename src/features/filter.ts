/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodosSortField } from '../utils/const';

interface FilterState {
  query: string;
  status: TodosSortField;
}

const initialState: FilterState = {
  query: '',
  status: TodosSortField.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setStatus: (state, action: PayloadAction<TodosSortField>) => {
      state.status = action.payload;
    },
  },
});

// export const { actions: filterActions } = filterSlice;
export const { setQuery, setStatus } = filterSlice.actions;
export const { reducer: filterReducer } = filterSlice;
export const { name: filterName } = filterSlice;
