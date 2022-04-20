import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

// Action types - is just a constant. MUST have a unique value.
const SET_TODOS = 'SET_TODOS';
const SET_TODO_TITLE = 'SET_TODO_TITLE';
const SET_TODO_STATUS = 'SET_TODO_STATUS';
const SET_HAS_LOADING_ERROR = 'SET_HAS_LOADING_ERROR';

// Action creators - a function returning an action object
export const actions = {
  setTodos: (todos: Todo[]) => ({
    type: SET_TODOS,
    payload: todos,
  }),
  setTodoTitle: (title: string) => ({
    type: SET_TODO_TITLE,
    payload: title,
  }),
  setTodoStatus: (status: TodoStatus) => ({
    type: SET_TODO_STATUS,
    payload: status,
  }),
  setHasLoadingError: (hasError: boolean) => ({
    type: SET_HAS_LOADING_ERROR,
    payload: hasError,
  }),
};

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const getTodoTitle = (state: RootState) => state.todoTitle;
export const getTodoStatus = (state: RootState) => state.todoStatus;
export const getHasLoadingError = (state: RootState) => state.hasLoadingError;

// Initial state
export type RootState = {
  todos: Todo[],
  todoTitle: string,
  todoStatus: TodoStatus,
  hasLoadingError: boolean,
};

const initialState: RootState = {
  todos: [],
  todoTitle: '',
  todoStatus: TodoStatus.all,
  hasLoadingError: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case SET_TODO_TITLE:
      return {
        ...state,
        todoTitle: action.payload,
      };

    case SET_TODO_STATUS:
      return {
        ...state,
        todoStatus: action.payload,
      };

    case SET_HAS_LOADING_ERROR:
      return {
        ...state,
        hasLoadingError: action.payload,
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
