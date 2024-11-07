import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(filter: Filter, { payload }: PayloadAction<Status>): Filter {
      return { ...filter, status: payload };
    },
    setQuery(filter: Filter, { payload }: PayloadAction<string>): Filter {
      return { ...filter, query: payload };
    },
  },
});
