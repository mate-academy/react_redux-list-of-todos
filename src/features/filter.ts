import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  status: string;
  query: string;
}

const initialState: FilterState = {
  status: 'all',
  query: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
