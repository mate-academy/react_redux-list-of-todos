import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface State {
  query: string;
  status: Status;
}

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    changeStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    changeQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { reducer: filterReducer, actions: filterActions } = filterSlice;
