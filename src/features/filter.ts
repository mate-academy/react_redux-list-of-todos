import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<Status>) => ({
      ...state,
      status: payload,
    }),
    setQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
    clearQuery: state => ({ ...state, query: '' }),
  },
});

export const { setStatus, setQuery, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
