import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const LOAD_TODOS = 'LOAD_TODOS';
const SELECT_USER_ID = 'SELECT_USER_ID';
const SET_TODOS_LOAD_ERROR = 'SET_TODOS_LOAD_ERROR';
const SET_USER_LOAD_ERROR = 'SET_USER_LOAD_ERROR';
const LOAD_USER = 'LOAD_USER';
const DELETE_TODO = 'DELETE_TODO';

export const loadTodosAC = (todos: Todo[]) => (
  { type: LOAD_TODOS, todos }
);

export const selectUserIdAC = (userId: number) => (
  { type: SELECT_USER_ID, userId }
);

export const todosLoadErrorAC = (newError: string) => (
  { type: SET_TODOS_LOAD_ERROR, newError }
);

export const userLoadErrorAC = (newError: string) => (
  { type: SET_USER_LOAD_ERROR, newError }
);

export const loadUserAC = (user: User | null) => (
  { type: LOAD_USER, user }
);

export const deleteTodoAC = (id: number) => (
  { type: DELETE_TODO, id }
);

export const loadTodosSelector = (state: RootState) => state.todos;
export const selectUserIdSelector = (state: RootState) => state.userId;
// eslint-disable-next-line max-len
export const todosLoadErrorSelector = (state: RootState) => state.todosLoadError;
export const userLoadErrorSelector = (state: RootState) => state.userLoadError;
export const loadUserSelector = (state: RootState) => state.user;

export type RootState = {
  todos: Todo[],
  userId: number,
  todosLoadError: string,
  userLoadError: string,
  user: User | null,
};

const initialState: RootState = {
  todos: [],
  userId: 0,
  todosLoadError: '',
  userLoadError: '',
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case SELECT_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };

    case SET_TODOS_LOAD_ERROR:
      return {
        ...state,
        todosLoadError: action.newError,
      };

    case SET_USER_LOAD_ERROR:
      return {
        ...state,
        userLoadError: action.newError,
      };

    case LOAD_USER:
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
