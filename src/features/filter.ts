import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters } from '../types/Filters';

const initialState = {
  query: '',
  status: Filters.All,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      /* eslint-disable-next-line no-param-reassign */
      state.query = action.payload;
    },

    setStatus(state, action: PayloadAction<Filters>) {
      /* eslint-disable-next-line no-param-reassign */
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
