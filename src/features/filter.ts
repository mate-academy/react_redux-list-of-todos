import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export interface FilterState {
  status: Status;
  query: string;
  todos: Todo[];
}

const initialState: FilterState = {
  status: 'all',
  query: '',
  todos: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
  },
});

export const { setFilter, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
