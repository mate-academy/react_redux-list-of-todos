import { Action, Reducer, createStore } from 'redux';
import { TodosWithUsers } from './types';
import {
  LOAD_TODOS,
  SET_LOAD,
  REMOVE_TODO,
  SORTED_TODOS,
} from './constants';

export interface InitialState {
  todos: TodosWithUsers | [];
  isLoading?: boolean;
  sortField?: string;
}

interface DispatchAction extends Action {
  type: string;
  todos: TodosWithUsers;
  id?: number;
  isLoading?: boolean;
  sortField?: string;
}

const initialState: InitialState = {
  todos: [],
  isLoading: false,
  sortField: undefined,
};

const reduser: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        todos: action.todos,
      };
    case SET_LOAD:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case REMOVE_TODO:
      return {
        todos: [...state.todos].filter(todo => todo.id !== action.id),
      };
    case SORTED_TODOS:
      return {
        todos: action.todos,
      };
    default:
      return state;
  }
};

export const store = createStore<InitialState, DispatchAction, null, null>(reduser);
