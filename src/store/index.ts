import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../types/todo';
import { User } from '../types/user';

const LOAD_TODOS = 'LOAD_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const SELECTED_USERID = 'SELECTED_USERID';
const SETUSER = 'SETUSER';

export const todosAction = (todos: Todo[]) => ({
  type: LOAD_TODOS,
  payload: todos,
});

export const removeTodoAction = (todoId: number) => ({
  type: DELETE_TODO,
  payload: todoId,
});

export const selectUserIdAction = (id: number) => ({
  type: SELECTED_USERID,
  payload: id,
});

export const userAction = (user: User) => ({
  type: SETUSER,
  payload: user,
});

export const todosSelector = (state: RootState) => state.todos;
export const selectedUserIdSelector
  = (state: RootState) => state.selectedUserId;
export const userSelector = (state: RootState) => state.user;

export type RootState = {
  todos: Todo[];
  selectedUserId: number;
  user: User | null;
};

const initialState: RootState = {
  todos: [],
  selectedUserId: 0,
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case SELECTED_USERID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case SETUSER:
      return {
        ...state,
        user: action.payload,
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
