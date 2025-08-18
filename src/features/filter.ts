import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterStatus = 'all' | 'completed' | 'active';

interface FilterState {
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
    setQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<FilterStatus>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    clearQuery: state => {
      // eslint-disable-next-line no-param-reassign
      state.query = '';
    },
  },
});

export const { setQuery, setStatusFilter, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;
