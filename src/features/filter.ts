import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface PropsState {
  filtered: Todo[];
  all: Todo[];
}

const initialState: PropsState = {
  filtered: [],
  all: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActive: state => {
      return {
        ...state,
        filtered: state.all.filter(item => !item.completed),
      };
    },
    setCompleted: state => {
      return {
        ...state,
        filtered: state.all.filter(item => item.completed),
      };
    },
    setAll: state => {
      return {
        ...state,
        filtered: state.all,
      };
    },
  },
});

export default filterSlice.reducer;
export const { setActive, setAll, setCompleted } = filterSlice.actions;
