import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (
      _filter,
      action: PayloadAction<{ query: string; status: string }>,
    ) => {
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    },
  },
});
