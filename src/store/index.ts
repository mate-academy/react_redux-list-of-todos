import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const LOADING_TODOS = 'LOADING_TODOS';
const SELECT_USER = 'SELECT_USER';
const GET_ERROR = 'GET_ERROR';
const GET_USER = 'GET_USER';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const actions = {
  loading__todos: (todos: Todo[]) => ({
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

// Selectors - a function receiving Redux state and returning some data from it
export const selectors = {
  loadTodos: (state: RootState) => state.todos,
  getUserId: (state: RootState) => state.userId,
  getError: (state: RootState) => state.errorLoading,
  loadUser: (state: RootState) => state.user,
};

// Initial state
export type RootState = {
  todos: Todo[];
  userId: number;
  errorLoading: string;
  user: User | null,
};

const initialState: RootState = {
  todos: [],
  userId: 0,
  errorLoading: '',
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADING_TODOS:
      return { ...state, todos: action.todos };

    case SELECT_USER:
      return {
        ...state,
        userId: action.userId,
      };
    case GET_ERROR:
      return {
        ...state,
        message: action.message,
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

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
