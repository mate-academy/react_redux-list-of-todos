import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SET_STATUS: (state, action: PayloadAction<{ status: Status }>) => {
      return { ...state, status: action.payload.status };
    },
    SET_QUERY: (state, action: PayloadAction<{ query: string }>) => {
      return { ...state, query: action.payload.query };
    },
  },
});

export const { SET_STATUS, SET_QUERY } = filterSlice.actions;
export default filterSlice.reducer;
