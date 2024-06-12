import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export const filterSlice: Slice<Status> = createSlice({
  name: 'filter',
  initialState: 'all' as Status,
  reducers: {
    setFilter: (_, { payload }: PayloadAction<Status>) => payload,
  },
});
