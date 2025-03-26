import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type StateType = {
  query: string;
  status: Status;
};

const initialState: StateType = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<StateType> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterByQuery: (state, action: PayloadAction<string>) => {
      const currentState = state;

      currentState.query = action.payload;
    },
    filterByStatus: (state, action: PayloadAction<Status>) => {
      const currentState = state;

      currentState.status = action.payload;
    },
  },
});

export const { filterByQuery, filterByStatus } = filterSlice.actions;
export default filterSlice.reducer;
