import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all' as 'all' | 'active' | 'completed',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAllFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setActiveFilter: state => {
      return {
        ...state,
        query: '',
      };
    },
    setCompletedFilter: state => {
      return {
        ...state,
        query: '',
      };
    },
  },
});

export const { setAllFilter, setActiveFilter, setCompletedFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
