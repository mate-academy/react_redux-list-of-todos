import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus(state: State, { payload }: PayloadAction<Status>) {
      return {
        ...state,
        status: payload,
      };
    },
    changeQuery(state: State, { payload }: PayloadAction<string>) {
      return {
        ...state,
        query: payload,
      };
    },
    resetQuery: () => {
      return initialState;
    },
  },
});

export const { changeStatus, changeQuery, resetQuery } = filterSlice.actions;
