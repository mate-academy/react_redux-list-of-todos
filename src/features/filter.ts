import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  query: string;
  status: 'all' | 'completed' | 'active';
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
    return { ...state, query: action.payload};
   },
   setStatus: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
    return { ...state, status: action.payload};
   },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
