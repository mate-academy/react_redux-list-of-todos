import { createStore, AnyAction } from 'redux';

enum Select {
  LOADING_TODOS = 'LOADING_TODOS',
  SELECT_USER = 'SELECT_USER',
  GET_ERROR = 'GET_ERROR',
  GET_USER = 'GET_USER',
  DELETE_TODO = 'DELETE_TODO'
}

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

export const actions = {
  loadingTodos: (todos: Todo[]) => ({
    type: Select.LOADING_TODOS,
    todos,
  }),
  selectUser: (userId: number) => ({
    type: Select.SELECT_USER,
    userId,
  }),
  getError: (message: string) => ({
    type: Select.GET_ERROR,
    message,
  }),
  getUser: (user: User) => ({
    type: Select.GET_USER,
    user,
  }),
  deleteTodo: (id: number) => ({
    type: Select.DELETE_TODO,
    id,
  }),
};

export const selectors = {
  loadTodos: (state: RootState) => state.todos,
  getUserId: (state: RootState) => state.userId,
  getError: (state: RootState) => state.errorLoading,
  loadUser: (state: RootState) => state.user,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Select.LOADING_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case Select.SELECT_USER:
      return {
        ...state,
        userId: action.userId,
      };

    case Select.GET_ERROR:
      return {
        ...state,
        errorLoading: action.message,
      };

    case Select.GET_USER:
      return {
        ...state,
        user: action.user,
      };

    case Select.DELETE_TODO:
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
);

export default store;
