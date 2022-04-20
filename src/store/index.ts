import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../types/todo';
import { User } from '../types/user';

// Action types - is just a constant. MUST have a unique value.
const LOAD_TODOS = 'LOAD_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const SELECTED_USERID = 'SELECTED_USERID';
const SETUSER = 'SETUSER';

// Action creators - a function returning an action object
export const loadTodos = (todos: Todo[]) => ({
  type: LOAD_TODOS,
  payload: todos,
});

export const deleteTodo = (todoId: number) => ({
  type: DELETE_TODO,
  payload: todoId,
});

export const setSelectedUserId = (id: number) => ({
  type: SELECTED_USERID,
  payload: id,
});

export const setUser = (user: User) => ({
  type: SETUSER,
  payload: user,
});

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const getSelectedUserId = (state: RootState) => state.selectedUserId;
export const getUser = (state: RootState) => state.user;

// Initial state
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

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo => todo.id !== action.payload)),
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

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
