import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryState = {
  query: string;
  status: string;
}

export enum Status { all = 'all', completed = 'completed', active = 'active' };

const initialState: QueryState = {
  query: '',
  status: Status.all,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchByQuery: (state, action: PayloadAction<string>) => {state.query = action.payload},
    clearQuery: (state) => {state.query = ''},
    setStatus: (state, action: PayloadAction<Status>) => {state.status = action.payload},
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
