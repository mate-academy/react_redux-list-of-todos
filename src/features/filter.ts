import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  query: string;
  status: 'all' | 'active' | 'completed';
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
