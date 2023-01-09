import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state, action: PayloadAction<Status>) => (
      { ...state, status: action.payload }
    ),
    query: (state, action: PayloadAction<string>) => (
      { ...state, query: action.payload }
    ),
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
