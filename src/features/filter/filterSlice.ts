import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/Status';

const initialState = { query: '', status: 'all' } as {
  query: string;
  status: Status;
};

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
