import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    deleteQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export const { setFilter, setQuery, deleteQuery } = filterSlice.actions;

export default filterSlice.reducer;
