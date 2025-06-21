import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 🔹 Оголошення типу явно
export interface FilterState {
  status: string;
  query: string;
}

// 🔹 Типізоване initialState
const initialState: FilterState = {
  status: 'all',
  query: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
