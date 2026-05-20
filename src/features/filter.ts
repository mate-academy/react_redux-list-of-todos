import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatusType = 'all' | 'completed' | 'active';

export type FilterType = {
  query: string;
  status: StatusType;
};

const initialState: FilterType = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },

    setStatus: (state, action: PayloadAction<StatusType>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
