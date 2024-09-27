import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: string;
};

const initialState: State = {
  query: '',
  status: Status.all,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state: State, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    query: (state: State, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload.trim();
    },
  },
});

export const { status, query } = filterSlice.actions;

export default filterSlice.reducer;
