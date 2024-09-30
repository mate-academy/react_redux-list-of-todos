import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterTypes } from '../types/Status';

type FilterStates = {
  query: string;
  status: FilterTypes;
};

const initialState: FilterStates = {
  query: '',
  status: FilterTypes.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchTodo: (state: FilterStates, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setFilter: (state: FilterStates, action: PayloadAction<FilterTypes>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { searchTodo, setFilter } = filterSlice.actions;
