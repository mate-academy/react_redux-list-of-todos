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
    setStatus: (state: State, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    setQuery: (state: State, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload.trim();
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;

export default filterSlice.reducer;
