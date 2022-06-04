import { AnyAction, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const LOAD_TODOS = 'LOAD_TODOS';
const SELECT_USER = 'SELECT_USER';
const LOAD_USER = 'LOAD_USER';
const GET_ERROR = 'GET_ERROR';
const DELETE_TODO = 'DELETE_TODO';

export const actions = {
  loadTodos: (todos: Todo[]) => ({
    type: LOAD_TODOS,
    todos,
  }),
  selectUser: (userId: number) => ({
    type: SELECT_USER,
    userId,
  }),
  loadUser: (user: User | null) => ({
    type: LOAD_USER,
    user,
  }),
  getError: (message: string) => ({
    type: GET_ERROR,
    message,
  }),
  deleteTodo: (id: number) => ({
    type: DELETE_TODO,
    id,
  }),
};

export const selectors = {
  loadTodos: (state: State) => state.todos,
  getUserId: (state: State) => state.userId,
  getError: (state: State) => state.errorLoad,
  loadUser: (state: State) => state.user,
};

interface State {
  todos: Todo[];
  userId: number;
  user: User | null;
  errorLoad: string;
}

const initialState: State = {
  todos: [],
  userId: 0,
  user: null,
  errorLoad: '',
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case SELECT_USER:
      return {
        ...state,
        userId: action.userId,
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.user,
      };

    case GET_ERROR:
      return {
        ...state,
        errorLoad: action.message,
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

export const store = createStore(
  reducer,
  composeWithDevTools(),
);
