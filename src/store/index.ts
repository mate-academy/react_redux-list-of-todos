import {
  createStore,
  AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

// Action types - is just a constant. MUST have a unique value.
const START_TODOS_LOADING = 'START_TODOS_LOADING';
const FINISH_TODOS_LOADING = 'FINISH_TODOS_LOADING';
const TOGGLE_USER_LOADING = 'TOGGLE_USER_LOADING';
const SELECT_USER = 'SELECT_USER';
const LOAD_TODOS = 'LOAD_TODOS';
const LOAD_USER = 'LOAD_USER';
const FILTER_TODOS = 'FILTER_TODOS';

// Action creators - a function returning an action object
export const startTodosLoading = (message = 'Loading...') => ({
  type: START_TODOS_LOADING,
  message,
});
export const finishTodosLoading = (message = '') => ({
  type: FINISH_TODOS_LOADING,
  message,
});
export const toggleUserLoading = () => ({ type: TOGGLE_USER_LOADING });
export const selectedUser = (userId: number | null) => ({
  type: SELECT_USER,
  userId,
});
export const loadedUser = (user: User | null) => ({
  type: LOAD_USER,
  user,
});
export const loadedTodos = (todos: Todo[]) => ({
  type: LOAD_TODOS,
  todos,
});

export const filterForTodos = (status: Status) => ({
  type: FILTER_TODOS,
  status,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoadingTodos = (state: RootState) => state.loadingTodos;
export const isLoadingUser = (state: RootState) => state.loadingUser;
export const getMessage = (state: RootState) => state.message;
export const getSelectedUser = (state: RootState) => state.userId;
export const getLoadedUser = (state: RootState) => state.user;
export const getLoadedTodos = (state: RootState) => state.todos;
export const getFilterForTodos = (state: RootState) => state.status;
export const getFilteredTodos = (state: RootState) => state.filteredTodos;

// Initial state
export type RootState = {
  loadingTodos: boolean;
  todos: Todo[],
  filteredTodos: Todo[],
  loadingUser: boolean;
  userId: number | null;
  user: User | null,
  message: string;
  status: Status;
};

const initialState: RootState = {
  loadingTodos: false,
  todos: [],
  filteredTodos: [],
  loadingUser: false,
  userId: null,
  user: null,
  message: '',
  status: Status.All,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FILTER_TODOS:
      return {
        ...state,
        status: action.status,
        filteredTodos: [...state.todos].filter((todo) => {
          switch (action.status) {
            case Status.Active:
              return !todo.completed;

            case Status.Completed:
              return todo.completed;

            default:
              return true;
          }
        }),
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.user,
      };

    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
        filteredTodos: action.todos,
        message: '',
      };

    case SELECT_USER:
      return {
        ...state,
        userId: action.userId,
      };

    case START_TODOS_LOADING:
      return {
        ...state,
        loadingTodos: !state.loadingTodos,
        message: action.message,
      };

    case FINISH_TODOS_LOADING:
      return {
        ...state,
        loadingTodos: !state.loadingTodos,
        message: action.message,
      };

    case TOGGLE_USER_LOADING:
      return {
        ...state,
        loadingUser: !state.loadingUser,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
