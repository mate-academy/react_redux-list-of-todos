import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SET_STATUS: (filter, { payload }: PayloadAction<Status>) => ({
      ...filter,
      status: payload,
    }),

    SET_QUERY: (filter, { payload }: PayloadAction<string>) => ({
      ...filter,
      query: payload,
    }),
  },
});
