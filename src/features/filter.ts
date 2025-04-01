import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state: FilterState, action) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatus: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;

export default filterSlice.reducer;

// : PayloadAction<string>
// export const filters = { Status };

// type AllFiter = { type: 'filter/ALL'; payload: string };
// type ActiveFiter = { type: 'filter/ACTIVE'; payload: string };
// type CompletedFiter = { type: 'filter/COMPLETED'; payload: string };

// type Filter = AllFiter | ActiveFiter | CompletedFiter;

// const all = (value: string): AllFiter => ({
//   type: 'filter/ALL',
//   payload: value,
// });

// const active = (value: string): ActiveFiter => ({
//   type: 'filter/ACTIVE',
//   payload: value,
// });

// const completed = (value: string): CompletedFiter => ({
//   type: 'filter/COMPLETED',
//   payload: value,
// });
