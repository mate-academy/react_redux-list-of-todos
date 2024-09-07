import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterStateSlice {
  query: string;
  status: Status;
}

const initialState: FilterStateSlice = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    clearQuery(state) {
      state.query = '';
    },
  },
});

export const { setStatus, setQuery, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
