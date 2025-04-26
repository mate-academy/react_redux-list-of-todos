import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '../enum/Filter';

const initialState = {
  query: '',
  status: Filter.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    sortByQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    sortByStatus: (state, action: PayloadAction<Filter>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { sortByQuery, sortByStatus } = filterSlice.actions;
export default filterSlice.reducer;
