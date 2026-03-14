import { createSlice } from '@reduxjs/toolkit';
import { Statuses } from '../types/Statuses';

interface State {
  query: string;
  status: `${Statuses}`;
}

const initialState: State = {
  query: '',
  status: Statuses.ALL,
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action) => ({ ...state, query: action.payload }),
    setStatus: (state, action) => ({ ...state, status: action.payload }),
    clearQuery: state => ({ ...state, query: '' }),
  },
});
