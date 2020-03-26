import { AnyAction } from 'redux';
import {
  IS_LOADING,
  SET_TODOS,
  DELETE_TODO,
  SET_SORT_TYPE,
} from './actionTypes';


export const initialState: RootState = {
  isLoading: false,
  todos: [],
  typeOfSort: '',
};

export const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case SET_SORT_TYPE:
      return {
        ...state,
        typeOfSort: action.typeOfSort,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: (state.todos.filter(todo => todo.id !== action.id)),
      };
    default:
      return state;
  }
};
