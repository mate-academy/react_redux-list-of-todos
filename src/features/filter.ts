import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  query: string;
  status: 'all' | 'active' | 'completed';
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    statusAll(state) {
      const theState = state;

      theState.status = 'all';
    },
    statusActive(state) {
      const theState = state;

      theState.status = 'active';
    },
    statusCompleted(state) {
      const theState = state;

      theState.status = 'completed';
    },
    setQuery(state, action: PayloadAction<string>) {
      const theState = state;

      theState.query = action.payload;
    },
    clearQuery(state) {
      const theState = state;

      theState.query = '';
    },
  },
});

export const {
  statusAll,
  statusActive,
  statusCompleted,
  setQuery,
  clearQuery,
} = filterSlice.actions;

export default filterSlice.reducer;
