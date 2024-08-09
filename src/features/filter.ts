import { Slice, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<typeof initialState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (filter, action) => {
      return {
        ...filter,
        query: action.payload,
      };
    },

    setStatus: (filter, action) => {
      return {
        ...filter,
        status: action.payload,
      };
    },
  },
});
