import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterType = {
  query: string | null;
  status: string | null;
};

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterType>) {
      // state.query = action.payload.query ?? state.query;
      // state.status = action.payload.status ?? state.status;
      return {
        query: action.payload.query ?? state.query,
        status: action.payload.status ?? state.status,
      };
    },
  },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
