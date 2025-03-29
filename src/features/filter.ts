import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../types/Status';
import { Status } from '../types/enums';

export interface FilterState {
  query: string;
  status: StatusType;
}

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterByStatus: (state, { payload }: PayloadAction<StatusType>) => {
      return { ...state, status: payload };
    },
    filterByQuery: (state, { payload }: PayloadAction<string>) => {
      return { ...state, query: payload };
    },
  },
});
