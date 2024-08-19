import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TodoStatus } from '../types/TodoStatus';

type FilterState = {
  query: string;
  status: TodoStatus;
};

const initialState: FilterState = {
  query: '',
  status: TodoStatus.all,
};

const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (state, action: PayloadAction<TodoStatus>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;

export default filterSlice;
