import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      if (action.payload.query !== undefined) {
        // eslint-disable-next-line no-param-reassign
        state.query = action.payload.query;
      }

      if (action.payload.status !== undefined) {
        // eslint-disable-next-line no-param-reassign
        state.status = action.payload.status;
      }
    },
  },
});
