import { AnyAction, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../types/TodoType';
import { User } from '../types/UserType';

const GET_TODOS = 'GET_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const GET_USER = 'GET_USER';
const SELECT_USER = 'SELECT_USER';
const GET_ERROR = 'GET_ERROR';

export const actions = {
  getTodos: (todos: Todo[]) => ({
    type: GET_TODOS,
    todos,
  }),
  deleteTodo: (id: number) => ({
    type: DELETE_TODO,
    id,
  }),
  getUser: (user: User) => ({
    type: GET_USER,
    user,
  }),
  selectUser: (userId: number) => ({
    type: SELECT_USER,
    userId,
  }),
  getError: (messageError: string) => ({
    type: GET_ERROR,
    messageError,
  }),
};

export const selectors = {
  loadTodos: (state: RootState) => state.todos,
  loadUser: (state: RootState) => state.user,
  getUserId: (state: RootState) => state.userId,
  getMessageError: (state: RootState) => state.messageError,
};

export type RootState = {
  todos: Todo[],
  user: User | null,
  userId: number,
  messageError: string,
};

const initialState: RootState = {
  todos: [],
  user: null,
  userId: 0,
  messageError: '',
};

const rootReducer = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.todos };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case GET_USER:
      return { ...state, user: action.user };

    case SELECT_USER:
      return { ...state, userId: action.userId };

    case GET_ERROR:
      return { ...state, messageError: action.messageError };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
