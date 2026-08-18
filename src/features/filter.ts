// filter.ts;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
  selectedTodoId: number | null; // 1. Додаємо поле для ID вибраної тудушки
}

const initialState: FilterState = {
  query: '',
  status: 'all',
  selectedTodoId: null, // 2. За замовчуванням нічого не вибрано
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },

    setStatus: (state, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload,
      };
    },

    // 3. Додаємо ред'юсер для збереження або скидання ID обраної тудушки
    setSelectedTodoId: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        selectedTodoId: action.payload,
      };
    },
  },
});

export const { setQuery, setStatus, setSelectedTodoId } = filterSlice.actions;
export default filterSlice.reducer;
