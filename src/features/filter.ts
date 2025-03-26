import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

interface State {
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
    changeStatus(state: State, { payload }: PayloadAction<Status>) {
      return {
        ...state,
        status: payload,
      };
    },
    changeQuary(state: State, { payload }: PayloadAction<string>) {
      return {
        ...state,
        query: payload,
      };
    },
  },
});

export const { changeQuary, changeStatus } = filterSlice.actions;
