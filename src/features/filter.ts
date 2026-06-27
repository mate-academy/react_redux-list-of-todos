import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all' as 'all' | 'active' | 'completed',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      /* eslint-disable no-param-reassign */
      state.query = action.payload;
    },

    setStatus: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>,
    ) => {
      /* eslint-disable no-param-reassign */
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
