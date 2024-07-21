import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (filter, action) => {
      // eslint-disable-next-line no-param-reassign
      filter.status = action.payload;
    },
    changeQuery: (filter, action) => {
      // eslint-disable-next-line no-param-reassign
      filter.query = action.payload;
    },
  },
});
