import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState: { query: string; status: Status } = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatus: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setSearchQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
