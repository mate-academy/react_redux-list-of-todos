import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setQuery, setFilter } = filterSlice.actions;
export const selectStatus = (state: RootState) => state.filter.status;
export const selectQuery = (state: RootState) => state.filter.query;

export default filterSlice.reducer;
