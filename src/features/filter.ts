import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export type FilterState = {
  status: Status;
  query: string;
};

const initialState: FilterState = {
  status: 'all',
  query: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      // Лінтер не дозволяє мутувати, тому повертаємо новий обʼєкт
      return { ...state, status: action.payload };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload.toLowerCase() };
    },
    clearQuery(state) {
      return { ...state, query: '' };
    },
  },
});

export const { setStatus, setQuery, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
