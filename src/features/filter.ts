import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});
