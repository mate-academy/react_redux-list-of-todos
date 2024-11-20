/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum FilterTypes {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

const initialState = {
  query: '',
  status: FilterTypes.All,
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterTypes>) {
      state.status = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});
