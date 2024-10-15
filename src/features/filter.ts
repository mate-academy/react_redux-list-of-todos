import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatus: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;

export default filterSlice.reducer;
