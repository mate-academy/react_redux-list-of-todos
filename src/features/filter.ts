import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    All: state => {
      return { ...state, status: Status.ALL };
    },

    Active: state => {
      return { ...state, status: Status.ACTIVE };
    },
    Completed: state => {
      return { ...state, status: Status.COMPLETED };
    },
    query: (state, { payload }: PayloadAction<string>) => {
      return { ...state, query: payload };
    },
  },
});
