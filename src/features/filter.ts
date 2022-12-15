import { createSlice } from '@reduxjs/toolkit';

const initialState = { query: '', status: 'all' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (filter, action) => ({ ...filter, query: action.payload }),
    setStatus: (filter, action) => ({ ...filter, status: action.payload }),
    removeQuery: (filter) => ({ ...filter, query: '' }),
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
