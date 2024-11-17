import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialTodos = {
  query: string;
  status: string;
};

const initialState: InitialTodos = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setQuery, setStatus } = filterSlice.actions;
