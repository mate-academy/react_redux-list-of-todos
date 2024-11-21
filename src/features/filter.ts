import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoFilter } from '../types/Todo';
import { FilterStatuses } from '../utils/enums/FiltersStatus';

const initialState: ITodoFilter = {
  query: '',
  status: FilterStatuses.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterStatus: (state, { payload }: PayloadAction<FilterStatuses>) => ({
      ...state,
      status: payload,
    }),

    setFilterQuery: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      query: payload,
    }),

    clearFilterState: () => initialState,
  },
});

export const { setFilterStatus, setFilterQuery, clearFilterState } =
  filterSlice.actions;
