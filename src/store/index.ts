import { createStore, AnyAction, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ALL } from '../constants';
import { getTodosFormServer, getUserFormServer } from '../api';
import { Dispatch } from 'redux';
import { TODO, RootState, USER } from '../typesDef';

// Action types - is just a constant. MUST have a unique value.
const SET_TODOS = 'SET_TODOS';
const TODO_ERROR = 'TODO_ERROR';
const TODO_QUERY = 'TODO_QUERY';
const TODOS_SELECTOR = 'TODOS_SELECTOR';
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';
const USER_ERROR = 'USER_ERROR';
const IS_USER_SELECTED = 'IS_USER_SELECTED';

// Action creators - a function returning an action object
export const setTodos = (todos: TODO[]) => ({
  type: SET_TODOS, todos,
});

export const setTodosError = (isErrorOccured: boolean) => ({
  type: TODO_ERROR, isErrorOccured
})

export const setQuery = (query: string) => ({
  type: TODO_QUERY, query
})

export const changeSelector = (todosSelector : string) => ({
  type: TODOS_SELECTOR, todosSelector,
});

export const setUserInfo = (userInfo : USER | {}) => ({
  type: SET_USER, userInfo,
});

export const clearUserState = () => ({
  type: CLEAR_USER,
});

export const setUserError = (error: boolean) => ({
  type: USER_ERROR, error
})

export const setIsUserSelected = (isUserSelected: boolean) => ({
  type: IS_USER_SELECTED, isUserSelected
})

// Selectors - a function receiving Redux state and returning some data from it
export const stateTodos = (state: RootState) => state.todos;
export const isTodosError = (state: RootState) => state.isTodoError;
export const todoFilterQuery = (state: RootState) => state.query;
export const showTodosOnly = (state: RootState) => state.todosSelector;
export const stateUserInfo = (state: RootState) => state.userInfo;
export const isUserError = (state: RootState) => state.userError;
export const isUserSelected = (state: RootState) => state.isUserSelected;

// Initial state
const initialState: RootState = {
  todos: [],
  isTodoError: false,
  query: '',
  todosSelector: ALL,
  userInfo: {},
  userError: false,
  isUserSelected: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
      case SET_TODOS:
        return {
          ...state,
          todos: [...action.todos],
        };

      case TODO_ERROR:
        return {
          ...state,
          isTodosError: action.isTodosError,
        }

      case TODO_QUERY: 
        return {
          ...state,
          query: action.query,
        }

      case TODOS_SELECTOR:
        return {
          ...state,
          todosSelector: action.todosSelector,
        };

      case SET_USER:
        return {
          ...state,
          userInfo: action.userInfo,
        };

      case CLEAR_USER:
        return {
          ...state,
          userInfo: {},
        };

      case USER_ERROR:
        return {
          ...state,
          userError: action.error,
        }

      case IS_USER_SELECTED:
        return {
          ...state,
          isUserSelected: action.isUserSelected,
        }

    default:
      return state;
  }
};

export const getTodos = () => {
  return (dispatch: Dispatch) => {
    getTodosFormServer()
    .then((todos) => {
      dispatch(setTodos(todos));
      dispatch(setTodosError(false));
    })
    .catch(() => {
      dispatch(setTodosError(true));
    })
  };
};

export const loadUserInfo = (id: number) => {
  return (dispatch: Dispatch) => {
    getUserFormServer(id)
    .catch(() => {
      dispatch(setUserError(true))
    })
    .then((userInfo : USER) => {
      dispatch(setUserInfo(userInfo));
      dispatch(setUserError(false))});
      ;
  };
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
