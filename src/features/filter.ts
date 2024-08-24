import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type StateType = {
  query: string;
  status: Status;
};

const initialState: StateType = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<StateType> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      return { ...state, status: action.payload };
    },

    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },

    clearQuery(state) {
      return { ...state, query: '' };
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
