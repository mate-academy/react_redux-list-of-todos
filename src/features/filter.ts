import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum StatusType {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

const initialState = {
  query: '',
  status: StatusType.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (
      state: typeof initialState,
      action: PayloadAction<StatusType>,
    ) => ({
      ...state,
      status: action.payload,
    }),
    changeQuery: (
      state: typeof initialState,
      action: PayloadAction<string>,
    ) => ({
      ...state,
      query: action.payload,
    }),
  },
});
