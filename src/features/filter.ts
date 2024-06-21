import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  query: string;
  status: string;
};

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state: State, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
    query: (state: State, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload.trim(),
    }),
  },
});
