import { Slice, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

export type FilterState = {
  query: string;
  status: string;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    }
  },
});

export default filterSlice.reducer as Reducer<FilterState>;
export const { setQuery, setStatus} = filterSlice.actions
