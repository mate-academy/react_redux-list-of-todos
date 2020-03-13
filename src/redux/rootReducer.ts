import { Action, Reducer, createStore } from 'redux';
import {
  LOAD_FROM_API,
  SORT_BY_NAME,
  SORT_BY_TITLE,
  SORT_BY_COMPLETE,
  DELETE_TASK,
} from '../constants/constants';

export interface InitialState {
  todos: PreparedTodo[] | [];
}

interface DispatchActions extends Action {
  type: string;
  payload: PreparedTodo[];
  id?: number;
}

const initialState: InitialState = {
  todos: [],
};

const rootReducer: Reducer<InitialState, DispatchActions> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FROM_API:
      return {
        todos: action.payload,
      };

    case SORT_BY_NAME:
      return {
        todos: [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };

    case SORT_BY_TITLE:
      return {
        todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };

    case SORT_BY_COMPLETE:
      return {
        todos: [...state.todos].sort((a, b) => Number(b.completed) - Number(a.completed)),
      };

    case DELETE_TASK:
      return {
        todos: [...state.todos].filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
};

export const store = createStore(rootReducer);
