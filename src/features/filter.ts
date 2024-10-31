import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (_, action) => {
      return { status: action.payload };
    },
  },
});

export default filterSlice.reducer;

export const { actions } = filterSlice;
