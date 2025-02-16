import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      return { ...state, status: action.payload };
    },
    settingQuery: (state, action) => {
      return { ...state, query: action.payload };
    },
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
