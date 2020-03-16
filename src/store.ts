import {
  createStore,
  Reducer,
  Action,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  SET_TODOS,
  SORT_BY_COMPLETED,
  SORT_BY_TITLE,
  SORT_BY_NAME,
  ON_DELETE,
} from './constants';

export interface InitialState {
  todos: PreparedTodo[] | [];
}

export interface DispatchAction extends Action {
  type: string;
  todos: PreparedTodo[];
  payload?: number;
}

const initialState: InitialState = {
  todos: [],
};

const reducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case SORT_BY_COMPLETED:
      return {
        ...state,
        todos: [...state?.todos]
          .sort((a, b) => Number(b.completed) - Number(a.completed)),
      };

    case SORT_BY_TITLE:
      return {
        ...state,
        todos: [...state?.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };

    case SORT_BY_NAME:
      return {
        ...state,
        todos: [...state?.todos]
          .sort((todoA, todoB) => todoA.user.username
            .localeCompare(todoB.user.username)),
      };

    case ON_DELETE:
      return {
        ...state,
        todos: [...state?.todos].filter(todo => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  composeWithDevTools(),
);
