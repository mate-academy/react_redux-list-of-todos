// src/features/filter.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Можливі статуси
export type StatusFilter = 'all' | 'active' | 'completed';

// Тип усього стану фільтра
export interface FilterState {
  query: string;
  status: StatusFilter;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      // Якщо хочете уникнути ESLint "no-param-reassign", можна “повертати” новий об’єкт
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus: (state, action: PayloadAction<StatusFilter>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    clearQuery: state => {
      return {
        ...state,
        query: '',
      };
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
