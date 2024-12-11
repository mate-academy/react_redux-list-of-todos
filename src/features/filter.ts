import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Filters = {
  query: string;
  status: Status;
};

const initialState: Filters = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addQuery: (state, action) => ({ ...state, query: action.payload }),
    addStatus: (state, action) => ({ ...state, status: action.payload }),
    clearQuery: state => ({ ...state, query: '' }),
  },
});
