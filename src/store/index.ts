import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getAllTodos, getUser, deleteTodo } from '../api/api';

const UPDATE_TODOS = 'UPDATE_TODOS';
const USER_SET = 'USER_SET';
const FILTER = 'FILTER';
const QUERY_SET = 'QUERY_SET';
const RANDOMIZE = 'RANDOMIZE';

export const actions = {
  startLoading: async (dispatch: typeof store.dispatch) => {
    try {
      const allTodos = await getAllTodos();

      dispatch(actions.updateTodos(allTodos));
    } catch {
      dispatch(actions.updateTodos([]));
    }
  },
  loadUser: (userId: number) => async (dispatch:
  typeof store.dispatch) => {
    try {
      const user = await getUser(userId);

      dispatch(actions.setUser(user));
    } catch {
      dispatch(actions.setUser({
        id: 0,
        name: '',
        username: '',
        email: '',
        phone: '',
      }));
    }
  },
  deleteTodo: (todoId: number) => async (dispatch:
  typeof store.dispatch) => {
    try {
      await deleteTodo(todoId);
      const allTodos = await getAllTodos();

      dispatch(actions.updateTodos(allTodos));
    } catch {
      dispatch(actions.updateTodos([]));
    }
  },
  updateTodos: (todos: Todo[]) => ({ type: UPDATE_TODOS, todos }),
  setUser: (user: User) => ({ type: USER_SET, user }),
  filter: (filter: string) => ({ type: FILTER, filter }),
  setQuery: (query: string) => ({ type: QUERY_SET, query }),
  randomize: () => ({ type: RANDOMIZE }),
  clear: (dispatch: typeof store.dispatch) => {
    dispatch(actions.setUser({
      id: 0,
      name: '',
      username: '',
      email: '',
      phone: '',
    }));
  },
};

export const isRandom = (state: RootState) => state.random;
export const getStateUser = (state: RootState) => state.user;
export const getTodos = (state: RootState) => state.todos;
export const getQuery = (state: RootState) => state.query;
export const getFilter = (state: RootState) => state.filter;

export type RootState = {
  random: boolean;
  todos: Todo[];
  user: User;
  query: string;
  filter: string;
};

const initialState: RootState = {
  random: false,
  todos: [],
  user: {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
  },
  query: '',
  filter: '',
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case USER_SET:
      return {
        ...state,
        user: action.user,
      };

    case FILTER:
      return {
        ...state,
        filter: action.filter,
      };

    case QUERY_SET:
      return {
        ...state,
        query: action.query.toLowerCase(),
      };

    case RANDOMIZE:
      return {
        ...state,
        random: !state.random,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
