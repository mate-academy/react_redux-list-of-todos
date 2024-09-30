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
      state.query = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setSearchQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
