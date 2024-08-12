import { createSlice } from '@reduxjs/toolkit';

export enum StatusTypes {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

interface StateType {
  query: string;
  status: StatusTypes;
}

const initialState: StateType = {
  query: '',
  status: StatusTypes.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    queryReducer(state, action) {
      return { ...state, query: action.payload };
    },
    statusReducer(state, action) {
      return { ...state, status: action.payload };
    },
  },
});

export const { queryReducer, statusReducer } = filterSlice.actions;
