import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatusFilter = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: StatusFilter;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setStatus: (state, action: PayloadAction<StatusFilter>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
