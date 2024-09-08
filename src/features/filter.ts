import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../enums/Status';

const initialState = {
  query: '',
  status: Status.All,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQueryFilter: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setSelectFilter: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setQueryFilter, setSelectFilter } = filterSlice.actions;

export default filterSlice.reducer;
