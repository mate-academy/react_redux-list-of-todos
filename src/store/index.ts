import { createStore } from 'redux';
import { Todo, User } from '../react-app-env';
// eslint-disable-next-line import/no-cycle
import { ActionType, Action } from './actions';

export enum TodosStatus {
  all = '0',
  completed = '1',
  inProgress = '2',
}

export interface State {
  todos: Todo[],
  user: User | null,
  status: TodosStatus,
  filter: string,
}

const initialState: State = {
  todos: [],
  user: null,
  status: TodosStatus.all,
  filter: '',
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case ActionType.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
