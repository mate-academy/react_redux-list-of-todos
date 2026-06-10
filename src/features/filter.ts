import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

type Status = 'all' | 'active' | 'completed';

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    deleteQuery(state) {
      return {
        ...state,
        query: '',
      };
    },
    setStatus(state, action: PayloadAction<Status>) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});
