import { Reducer } from 'react';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { getTodos } from '../api/api';
import { Todo, User } from '../types/TodoType';

// Action types - is just a constant. MUST have a unique value.
const GET_TODOS = 'GET_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const GET_USER = 'GET_USER';
const SELECT_USER = 'SELECT_USER';
const GET_ERROR = 'GET_ERROR';

// Action creators - a function returning an action object
export enum ActionTypes {
  GetTodos = 'Get::Todos',
  DeleteTodos = 'Delete::Todos',
  GetUser = 'Get::User',
  SelectUser = 'Select::User',
  GetError = 'Get::Error',
}

interface GetTodosAction {
  type: ActionTypes.GetTodos,
  payload: Todo[],
}

interface DeleteTodosAction {
  type: ActionTypes.DeleteTodos,
  payload: number,
}

interface GetUserAction {
  type: ActionTypes.GetUser,
  payload: User,
}

interface SelectUserAction {
  type: ActionTypes.SelectUser,
  payload: number,
}

interface GetErrorAction {
  type: ActionTypes.GetError,
  payload: string,
}

type Action = GetTodosAction
| DeleteTodosAction
| GetUserAction
| SelectUserAction
| GetErrorAction;

export const actions = {
  getTodos: (todos: Todo[]) => ({
    type: GET_TODOS,
    payload: todos,
  }),
  deleteTodo: (id: number) => ({
    type: DELETE_TODO,
    payload: id,
  }),
  getUser: (user: User) => ({
    type: GET_USER,
    payload: user,
  }),
  selectUser: (userId: number) => ({
    type: SELECT_USER,
    payload: userId,
  }),
  getError: (messageError: string) => ({
    type: GET_ERROR,
    payload: messageError,
  }),
};

// Selectors - a function receiving Redux state and returning some data from it
export const selectors = {
  loadTodos: (state: RootState) => state.todos,
  loadUser: (state: RootState) => state.user,
  getUserId: (state: RootState) => state.userId,
  getMessageError: (state: RootState) => state.messageError,
};

// Initial state
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

// rootReducer - this function is called after dispatching an action
const rootReducer: Reducer<RootState, Action> = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.GetTodos:
      return { ...state, todos: action.payload };

    case ActionTypes.DeleteTodos:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case ActionTypes.GetUser:
      return { ...state, user: action.payload };

    case ActionTypes.SelectUser:
      return { ...state, userId: action.payload };

    case ActionTypes.GetError:
      return { ...state, messageError: action.payload };

    default:
      return state;
  }
};

const store = createStore<RootState, Action, {}, {}>(
  rootReducer,
  composeWithDevTools(),
);

export default store;
