import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.All,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },

    updateFilter: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { updateQuery, updateFilter } = filterSlice.actions;
