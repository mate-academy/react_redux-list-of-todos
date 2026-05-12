import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: 'all' | 'completed' | 'active';
};

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
      action: PayloadAction<'all' | 'completed' | 'active'>,
    ) => ({
      ...state,
      status: action.payload,
    }),
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
