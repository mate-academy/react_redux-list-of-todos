import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StatusFilter = 'all' | 'active' | 'completed';

type StateFilter = {
  query: string;
  status: StatusFilter;
};

const initialState: StateFilter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    clear: () => initialState,
  },
});

export const { actions } = filterSlice;
