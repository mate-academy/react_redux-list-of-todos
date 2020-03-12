import { createStore, AnyAction } from 'redux';
import { PreparedTodo } from './types';

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

function reduser(state = initialState, action: AnyAction) {
  switch(action.type) {
    case 'SET_IS_LOADING':
      return { ...state,
      isLoading: action.isLoading}
    case 'SET_IS_LOADED':
      return { ...state,
      isLoaded: action.isLoaded}
    case 'SET_TODOS':
      return { ...state,
      todos: action.todos}
    case 'SET_SELECTED_SORT':
      return { ...state,
      selectedSort: action.selectedSort}
   case 'DELETE_TASK':
    return { ...state,
      todos: [...state.todos].filter(todo => todo.id !== action.id)}
    default:
      return state;
  }
};

export const store = createStore(reduser);
