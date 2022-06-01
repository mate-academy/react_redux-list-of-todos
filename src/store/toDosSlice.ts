// there I imported rootState because i use it in selectors for this inner state

/* eslint-disable import/no-cycle */

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { ToDo } from '../types/ToDo';
import { FilterToDosBy } from '../enums/FilterToDosBy';

interface FilterQueryState {
  toDos: Array<ToDo>,
  filterByQuery: string,
  filterCompletedToDos: FilterToDosBy,
  isRandomized: boolean,
}

const initialState: FilterQueryState = {
  toDos: [],
  filterByQuery: '',
  filterCompletedToDos: FilterToDosBy.all,
  isRandomized: false,
};

export const toDosSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    setToDos: (state, action: PayloadAction<Array<ToDo>>) => {
      state.toDos = action.payload;
    },
    removeToDoById: (state, action: PayloadAction<number>) => {
      state.toDos = state.toDos.filter(toDo => toDo.id !== action.payload);
    },
    setFilterByQuery: (state, action: PayloadAction<string>) => {
      state.filterByQuery = action.payload;
    },
    setFilterCompletedToDos: (state, action: PayloadAction<FilterToDosBy>) => {
      state.filterCompletedToDos = action.payload;
    },
    setIsRandomized: (state, action: PayloadAction<boolean>) => {
      state.isRandomized = action.payload;
    },
  },
});

export const {
  setToDos,
  setFilterByQuery,
  setFilterCompletedToDos,
  setIsRandomized,
  removeToDoById,
} = toDosSlice.actions;

export const selectors = {
  pureToDos: (state: RootState) => state.toDos.toDos,
  filterByQuery: (state: RootState) => state.toDos.filterByQuery,
  filterCompletedToDos: (state: RootState) => state.toDos.filterCompletedToDos,
  isRandomized: (state: RootState) => state.toDos.isRandomized,
  filteredAndSortedToDos: (state: RootState) => {
    const {
      filterByQuery,
      toDos,
      filterCompletedToDos,
      isRandomized,
    } = state.toDos;
    const pattern = filterByQuery.toLowerCase();

    const filtered = (toDos.filter(toDo => {
      const title = toDo.title.toLowerCase();
      const includePattern = title.includes(pattern);

      switch (Number(filterCompletedToDos)) {
        case FilterToDosBy.all:
          return includePattern;

        case FilterToDosBy.completed:
          return includePattern && toDo.completed;

        case FilterToDosBy.active:
          return includePattern && !toDo.completed;

        default:
          return toDo;
      }
    }));

    if (isRandomized) {
      for (let i = filtered.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));

        // eslint-disable-next-line no-param-reassign
        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
      }
    }

    return filtered;
  },
};

export default toDosSlice.reducer;
