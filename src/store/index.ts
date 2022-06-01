import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const LOADING_TODOS = 'LOADING_TODOS';
const SELECT_USER = 'SELECT_USER';
const GET_ERROR = 'GET_ERROR';
const GET_USER = 'GET_USER';
const DELETE_TODO = 'DELETE_TODO';

export const actions = {
  loadingTodos: (todos: Todo[]) => ({
    type: LOADING_TODOS,
    todos,
  }),
  selectUser: (userId: number) => ({
    type: SELECT_USER,
    userId,
  }),
  getError: (message: string) => ({
    type: GET_ERROR,
    message,
  }),
  getUser: (user: User) => ({
    type: GET_USER,
    user,
  }),
  deleteTodo: (id: number) => ({
    type: DELETE_TODO,
    id,
  }),
};

export const selectors = {
  loadTodos: (state: RootState) => state.todos,
  getUserId: (state: RootState) => state.userId,
  getError: (state: RootState) => state.errorLoading,
  loadUser: (state: RootState) => state.user,
};

export type RootState = {
  todos: Todo[];
  userId: number;
  errorLoading: string;
  user: User | null,
  sort: boolean,
};

const initialState: RootState = {
  todos: [],
  userId: 0,
  errorLoading: '',
  user: null,
  sort: false,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADING_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case SELECT_USER:
      return {
        ...state,
        userId: action.userId,
      };

    case GET_ERROR:
      return {
        ...state,
        errorLoading: action.message,
      };

    case GET_USER:
      return {
        ...state,
        user: action.user,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
