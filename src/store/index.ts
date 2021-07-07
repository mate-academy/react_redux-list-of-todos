import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import todosReducer, {
  selectors as todosSelectors,
  actions as todosActions,
  TodosState,
} from './todosStore';

import currentUserReducer, {
  selectors as userSelectors,
  actions as userActions,
  CurrentUserState,
} from './currentUserStore';

import filtersReducer, {
  selectors as filtersSelectors,
  FiltersState,
} from './filtersStore';

import * as api from '../api/api';

export type RootState = {
  todos: TodosState;
  currentUser: CurrentUserState;
  filters: FiltersState;
};

export const selectors = {
  getTodos: (state: RootState) => todosSelectors.getTodos(state.todos),
  areTodosLoading: (state: RootState) => todosSelectors.isLoading(state.todos),
  hasTodosError: (state: RootState) => todosSelectors.hasError(state.todos),
  areTodosInitialized: (state: RootState) => todosSelectors.isInitialized(state.todos),

  getTitleQuery: (state: RootState) => filtersSelectors.getQuery(state.filters),
  getStatusQuery: (state: RootState) => filtersSelectors.getStatus(state.filters),

  getUserId: (state: RootState) => userSelectors.getUserId(state.currentUser),
  getUser: (state: RootState) => userSelectors.getUser(state.currentUser),
};

export const actions = {
  loadTodos: () => {
    return async (dispatch: AppDispatch) => {
      dispatch(todosActions.enableLoading());
      dispatch(todosActions.setError(false));

      try {
        const todosFromServer = await api.getTodosFromServer();

        dispatch(todosActions.setTodos(todosFromServer));
        dispatch(todosActions.initialize());
      } catch (error) {
        dispatch(todosActions.setError(true));
      } finally {
        dispatch(todosActions.disableLoading());
      }
    };
  },
  clearTodos: () => {
    return (dispatch: AppDispatch) => {
      dispatch(todosActions.setTodos([]));
      dispatch(todosActions.cancelInitialization());
    };
  },
  deleteTodo: (id: number) => {
    return async (dispatch: AppDispatch) => {
      try {
        api.deleteTodoFromServer(id);
        dispatch(todosActions.deleteTodo(id));
      } catch (error) {
        dispatch(todosActions.setError(true));
      }
    };
  },
  loadUser: (id: number) => {
    return async (dispatch: AppDispatch) => {
      dispatch(userActions.enableLoading());
      dispatch(userActions.setError(false));

      try {
        const userFromServer = await api.getUserFromServer(id);

        dispatch(userActions.setUser(userFromServer));
        dispatch(userActions.initialize());
      } catch (error) {
        dispatch(userActions.setError(true));
      } finally {
        dispatch(userActions.disableLoading());
      }
    };
  },
  clearUser: () => {
    return (dispatch: AppDispatch) => {
      dispatch(userActions.setUser(null));
      dispatch(userActions.cancelInitialization());
    };
  },
};

const reducer = combineReducers({
  todos: todosReducer,
  currentUser: currentUserReducer,
  filters: filtersReducer,
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export type AppDispatch = typeof store.dispatch;

export default store;
