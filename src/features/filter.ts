import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(filterParameters, { payload }: PayloadAction<string>) {
      return {
        ...filterParameters,
        query: payload,
      };
    },

    deleteQuery(filterParameters) {
      return {
        ...filterParameters,
        query: '',
      };
    },

    setStatus(filterParameters, { payload }: PayloadAction<Status>) {
      return {
        ...filterParameters,
        status: payload,
      };
    },
  },
});
