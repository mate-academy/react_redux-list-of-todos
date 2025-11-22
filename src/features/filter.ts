import { createSlice } from '@reduxjs/toolkit';
import { FilterState } from '../types/FilterState';

const initialState: FilterState = { query: '', status: 'all', notif: '' };

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setFilterQuery(state, action): FilterState {
      return { ...state, query: action.payload };
    },

    setFilterNotif(state, action) {
      return { ...state, notif: action.payload };
    },

    setFilterStatus(state, action): FilterState {
      return { ...state, status: action.payload };
    },

    clearFilterQuery(state): FilterState {
      return { ...state, query: '' };
    },
  },
});

export const {
  setFilterQuery,
  setFilterStatus,
  clearFilterQuery,
  setFilterNotif,
} = filterSlice.actions;
