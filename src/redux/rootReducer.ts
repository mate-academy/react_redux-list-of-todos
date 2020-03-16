import { Action, Reducer, createStore } from 'redux';
import { Type } from '../actions/actionCreator';

export interface InitialState {
  todos: PreparedTodo[] | [];
  field: string;
}

interface Payload {
  todos: PreparedTodo[];
  id: number;
  sort: string;
}
interface DispatchActions extends Action {
  payload: Payload;
}

const initialState: InitialState = {
  todos: [],
  field: Type.SORT_BY_NAME,
};

const rootReducer: Reducer<InitialState, DispatchActions> = (state = initialState, action) => {
  switch (action.type) {
    case Type.LOAD_FROM_API:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case 'sort':
      return {
        ...state,
        field: action.payload.sort,
      };
    case Type.DELETE_TASK:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.payload.id),
      };

    default:
      return state;
  }
};

const devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, devTool);
