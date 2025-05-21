import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
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
