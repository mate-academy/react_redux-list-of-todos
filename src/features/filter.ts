import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
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
export default filterSlice.reducer;
export const { setQuery, setStatus } = filterSlice.actions;
