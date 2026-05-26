import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload; // eslint-disable-line no-param-reassign
    },
    setQuery: (state, action) => {
      state.query = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});
