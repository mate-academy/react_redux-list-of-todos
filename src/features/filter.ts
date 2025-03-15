/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
  selectedTodoId: null as number | null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSelectedTodoId: (state, action) => {
      state.selectedTodoId = action.payload;
    },
  },
});

export const { setQuery, setStatus, setSelectedTodoId } = filterSlice.actions;
export default filterSlice.reducer;
