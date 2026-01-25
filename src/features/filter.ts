import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Status = 'all' | 'completed' | 'active';

export type StatusState = {
  query: string;
  status: Status;
};

const initialState: StatusState = {
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
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;

export default filterSlice.reducer;
