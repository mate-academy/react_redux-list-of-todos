import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../types/Status';

type FilterType = {
  query: string;
  status: StatusType;
};

const initialState: FilterType = {
  query: '',
  status: StatusType.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<StatusType>) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
  },
});

export const { setState, setQuery } = filterSlice.actions;
