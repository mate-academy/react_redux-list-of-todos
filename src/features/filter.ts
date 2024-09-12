import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: string;
};

const initialState: State = {
  query: '',
  status: Status.all,
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
