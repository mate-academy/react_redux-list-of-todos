import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { LoadingTypes } from '../enums/LoadingTypes';

const initialState = {
  todos: [] as Todo[],
  todosLoadingStatus: LoadingTypes.idle,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosFetching: state => {
      return {
        ...state,
        todosLoadingStatus: LoadingTypes.loading,
      };
    },
    todosFetchError: state => {
      return {
        ...state,
        todosLoadingStatus: LoadingTypes.error,
      };
    },
    todosFetched: (state, action: PayloadAction<Todo[]>) => {
      return {
        ...state,
        todos: action.payload,
        todosLoadingStatus: LoadingTypes.idle,
      };
    },
  },
});

export const { todosFetching, todosFetchError, todosFetched } =
  todosSlice.actions;

export default todosSlice.reducer;
