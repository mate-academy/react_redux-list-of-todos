import { Reducer } from 'redux';
import { Actions, ActionTypes } from './actionTypes';
import { RootState } from '../utils/interfaces';


export const getTodos = (state: RootState) => state.todos;
export const getIsLoading = (state: RootState) => state.isLoading;
export const getIsLoaded = (state: RootState) => state.isLoaded;
export const getSortfield = (state: RootState) => state.sortField;


export const initialState: RootState = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  sortField: '',
};

export const rootReducer: Reducer<RootState, Actions> = (state, action) => {
  if (state === undefined) {
    return { ...initialState };
  }

  switch (action.type) {
    case ActionTypes.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };
    case ActionTypes.SetLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SetLoaded:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case ActionTypes.SetSortField:
      return {
        ...state,
        sortField: action.payload,
      };

    case ActionTypes.DeleteTodo: {
      const newTodos = state.todos.filter(todo => todo.id !== action.payload);

      return {
        ...state,
        todos: newTodos,
      };
    }

    default:
      return state;
  }
};
