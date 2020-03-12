import { createStore, AnyAction } from 'redux';
import { PreparedTodo } from './types';

export interface State {
  todos: PreparedTodo[] | []
  isLoading: boolean
  isLoaded: boolean
  selectedSort: string
}

const initualState: State = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  selectedSort: 'choose',
}

function reduser(state = initualState, action: AnyAction) {
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
      default:
      return state;
  }
};

export const store = createStore(reduser);
