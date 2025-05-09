import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Status {
  query: string;
  status: 'all' | 'completed' | 'active';
}

const initialState: Status = {
  query: '',
  status: 'all',
};

/* eslint-disable no-param-reassign */
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<'all' | 'completed' | 'active'>,
    ) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
