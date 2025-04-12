import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  status: 'all' | 'active' | 'completed';
  searchTerm: string;
}

const initialState: FilterState = {
  status: 'all',
  searchTerm: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.status = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setFilterStatus, setSearchTerm } = filterSlice.actions;
export default filterSlice.reducer;
