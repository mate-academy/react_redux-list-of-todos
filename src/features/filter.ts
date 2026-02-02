import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '../types/Filter';

type InitialStateType = {
  query: string;
  status: Filter;
};

const initialState: InitialStateType = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),
    updateStatus: (state, { payload }: PayloadAction<Filter>) => ({
      ...state,
      status: payload,
    }),
  },
});
