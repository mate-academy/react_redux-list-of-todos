import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedType } from '../types/SelectedType';

const initialState = {
  query: '',
  status: SelectedType.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SelectedType>) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    clearQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export const { setFilter, setQuery, clearQuery } = filterSlice.actions;
export default filterSlice.reducer;

//зберігають запит і статус //query and status
