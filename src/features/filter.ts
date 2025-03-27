import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<{ query?: string; status?: string }>,
    ) => {
      if (action.payload.query !== undefined) {
        // eslint-disable-next-line no-param-reassign
        state.query = action.payload.query;
      }

      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status || 'all';
    },
  },
});

export const { changeFilter } = filterSlice.actions;
