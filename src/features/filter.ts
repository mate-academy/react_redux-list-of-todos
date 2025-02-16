/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'active' | 'completed';

interface State {
  query: string;
  status: FilterStatus;
}

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export default filterSlice.reducer;

export const { setStatus, setQuery } = filterSlice.actions;
