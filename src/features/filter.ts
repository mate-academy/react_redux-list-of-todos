import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: FilterStatus;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus(state, action: PayloadAction<FilterStatus>) {
      return {
        ...state,
        status: action.payload,
      };
    },
    clearQuery: state => {
      return {
        ...state,
        query: '',
      };
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
