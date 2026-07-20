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
      state.query = action.payload,
},
    setStatus: (state, action) => {
      state.status = action.payload,
    }
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
