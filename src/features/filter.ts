import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '../types/Filter';

const initialState = {
  query: '',
  status: Filter.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (filter, { payload }: PayloadAction<Filter>) => ({
      ...filter,
      status: payload,
    }),
    setQuery: (filter, { payload }: PayloadAction<string>) => ({
      ...filter,
      query: payload,
    }),
  },
});
