import { Action, Reducer, createStore } from 'redux';
import { Type } from '../actions/actionCreator';

export interface InitialState {
  todos: PreparedTodo[] | [];
}

interface Payload {
  todos: PreparedTodo[];
  id: number;
}
interface DispatchActions extends Action {
  payload: Payload;
}

const initialState: InitialState = {
  todos: [],
};

const rootReducer: Reducer<InitialState, DispatchActions> = (state = initialState, action) => {
  switch (action.type) {
    case Type.LOAD_FROM_API:
      return {
        todos: action.payload.todos,
      };

    case Type.SORT_BY_NAME:
      return {
        todos: [...state.todos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
      };

    case Type.SORT_BY_TITLE:
      return {
        todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };

    case Type.SORT_BY_COMPLETE:
      return {
        todos: [...state.todos].sort((a, b) => Number(b.completed) - Number(a.completed)),
      };

    case Type.DELETE_TASK:
      return {
        todos: [...state.todos].filter(todo => todo.id !== action.payload.id),
      };

    default:
      return state;
  }
};

const devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, devTool);
