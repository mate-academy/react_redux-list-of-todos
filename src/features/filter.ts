import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
