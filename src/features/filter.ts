import { createSlice } from '@reduxjs/toolkit';

type Status = 'all' | 'active' | 'completed';
type InitialState = {
  query: string;
  status: Status;
};

const initialState: InitialState = {
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
