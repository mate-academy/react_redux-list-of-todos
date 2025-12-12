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
    setStatus: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
