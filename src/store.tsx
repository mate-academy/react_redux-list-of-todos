import { Action, Reducer, createStore } from 'redux';

interface DispatchAction extends Action {
  type: string;
  payload: TodoWithUser[];
  id?: number;
}

export interface InitialState {
  todos: TodoWithUser[] | [];
}

const LOAD_FROM_API = 'LOAD_FROM_API';
const SORT_BY_NAME = 'SORT_BY_NAME';
const SORT_BY_TITLE = 'SORT_BY_TITLE';
const SORT_BY_COMPLETE = 'SORT_BY_COMPLETE';
const DELETE_TASK = 'DELETE_TASK';

const initialState: InitialState = {
  todos: [],
};

export const setTodos = (payload: TodoWithUser[]) => ({
  type: LOAD_FROM_API,
  payload,
});

export const sortByName = () => ({
  type: SORT_BY_NAME,
});

export const sortByTitle = () => ({
  type: SORT_BY_TITLE,
});

export const sortByComplete = () => ({
  type: SORT_BY_COMPLETE,
});

const todosReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
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
        todos: [...state.todos].sort((a, b) => Number(a.completed) - Number(b.completed)),
      };

    case DELETE_TASK:
      return {
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
};

export const store = createStore<InitialState, DispatchAction, null, null>(todosReducer);
