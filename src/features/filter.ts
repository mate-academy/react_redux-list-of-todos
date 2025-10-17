import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = { query: string; status: Status }

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (filter, action: PayloadAction<string>) => { filter.query = action.payload },
    setStatus: (filter, action: PayloadAction<Status>) => { filter.status = action.payload },
  },
});
