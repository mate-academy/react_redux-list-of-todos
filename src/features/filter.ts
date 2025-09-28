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
    setQuery: ({ status }, { payload }: PayloadAction<string>) => ({
      query: payload,
      status,
    }),
    setStatus: ({ query }, { payload }: PayloadAction<Status>) => ({
      query,
      status: payload,
    }),
    resetQuery: ({ status }) => ({ query: '', status }),
    resetStatus: ({ query }) => ({ query, status: Status.ALL }),
  },
});
