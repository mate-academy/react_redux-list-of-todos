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

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        query: payload,
      };
    },

    changeFilter: (state, { payload }: PayloadAction<Status>) => {
      return {
        ...state,
        status: payload,
      };
    },
  },
});
