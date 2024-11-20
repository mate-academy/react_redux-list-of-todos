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
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const actions = filterSlice.actions;
