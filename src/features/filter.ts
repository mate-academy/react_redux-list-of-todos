import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type InitialStateType = {
  query: string;
  status: Status;
};

const initialState: InitialStateType = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setQuery, clearQuery, setStatus } = filterSlice.actions;
