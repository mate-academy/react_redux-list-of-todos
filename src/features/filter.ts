import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { StatusTypes } from '../types/Status';

const initialState = {
  query: '',
  status: StatusTypes.ALL,
};

type FilterState = {
  query: string;
  status: StatusTypes;
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    queryReducer(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },

    statusReducer(state, action: PayloadAction<StatusTypes>) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { queryReducer, statusReducer } = filterSlice.actions;
