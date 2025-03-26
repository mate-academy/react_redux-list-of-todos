import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: string;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (state, action: PayloadAction<string>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
