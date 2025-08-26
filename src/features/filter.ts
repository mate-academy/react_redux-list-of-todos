/* eslint-disable no-param-reassign */
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
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
    clearFilter: state => {
      state.query = '';
      state.status = 'all';
    },
  },
});

// export const filterSlice = createSlice({
//   name: 'filter',
//   initialState,
//   reducers: {
//     setQuery: (state, action: PayloadAction<string>) => ({
//       ...state,
//       query: action.payload,
//     }),
//     setStatus: (state, action: PayloadAction<FilterState>) => ({
//       ...state,
//       status: action.payload,
//     }),
//     clearFilter: () => ({
//       query: '',
//       status: 'all',
//     }),
//   },
// });

export const { setQuery, setStatus, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
