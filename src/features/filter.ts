import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),

    changeQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),

    clearQuery: state => ({ ...state, query: '' }),
  },
});

export const { actions: filterActions, reducer: filterReducer } = filterSlice;
