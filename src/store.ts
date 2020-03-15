import { Action, Reducer, createStore } from 'redux';
import { TodosWithUsers } from './types';
import {
  LOAD_TODOS,
  REMOVE_TODO,
  SORT_BY_NAME,
  SORT_BY_TITLE,
  SORT_BY_COMPLETED,
} from './constants';

export interface InitialState {
  todos: TodosWithUsers | [];
}

interface DispatchAction extends Action {
  type: string;
  todos: TodosWithUsers;
  id?: number;
}

const initialState: InitialState = {
  todos: [],
};

const reduser: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        todos: action.todos,
      };
    case REMOVE_TODO:
      return {
        todos: [...state.todos].filter(todo => todo.id !== action.id),
      };
    case SORT_BY_NAME:
      return {
        todos: [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };
    case SORT_BY_TITLE:
      return {
        todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };
    case SORT_BY_COMPLETED:
      return {
        todos: [...state.todos].sort((a, b) => Number(a.completed) - Number(b.completed)),
      };
    default:
      return state;
  }
};

export const store = createStore<InitialState, DispatchAction, null, null>(reduser);
