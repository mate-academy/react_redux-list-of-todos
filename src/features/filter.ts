import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    updateQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const { updateStatus, updateQuery } = filterSlice.actions;
export default filterSlice.reducer;
