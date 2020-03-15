import { createStore, AnyAction } from 'redux';
import { PreparedTodo } from '../constants_types/types';
import { SET_IS_LOADING,
  SET_IS_LOADED,
  SET_TODOS,
  SET_SELECTED_SORT,
  DELETE_TASK } from '../constants_types/constants';

export interface State {
  todos: PreparedTodo[] | []
  isLoading: boolean
  isLoaded: boolean
  selectedSort: string
}

const initialState: State = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  selectedSort: 'choose',
}

function reducer(state = initialState, action: AnyAction) {
  switch(action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.isLoaded
      }
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos
      }
    case SET_SELECTED_SORT:
      return {
        ...state,
        selectedSort: action.selectedSort
      }
   case DELETE_TASK:
    return {
      ...state,
      todos: (state.todos as PreparedTodo[]).filter(todo => todo.id !== action.id)
    }
    default:
      return state;
  }
};

export const store = createStore(reducer);
