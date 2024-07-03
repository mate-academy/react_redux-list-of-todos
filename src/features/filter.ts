import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    changeStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    resetQuery(state) {
      state.query = '';
    },
    resetStatus(state) {
      state.status = 'all';
    },
  },
});

export const { changeQuery, changeStatus, resetQuery, resetStatus } =
  filterSlice.actions;

export default filterSlice.reducer;
