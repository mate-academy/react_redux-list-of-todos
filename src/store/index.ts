import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const SET_TODOS = 'SET_TODOS';
const START_LOADING = 'START_LOADING';
const SET_LOADED = 'SET_LOADED';
const SORT_BY = 'SORT_BY';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const setTodos = (todos: Todo[]) => {
  return {
    type: SET_TODOS,
    todos,
  };
};

export const setSortBy = (sortBy: string) => {
  return {
    type: SORT_BY,
    sortBy,
  };
};

export const deleteTodo = (id: number) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

export const startLoading = () => ({ type: START_LOADING });
export const setIsLoaded = () => ({ type: SET_LOADED });

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const getLoading = (state: RootState) => state.loading;
export const getLoaded = (state: RootState) => state.loaded;
export const getSortBy = (state: RootState) => state.sortBy;

// Initial state
const initialState: RootState = {
  todos: [],
  loading: false,
  loaded: false,
  sortBy: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_LOADED:
      return {
        ...state,
        loading: false,
        loaded: true,
      };

    case SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
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
export const store = createStore(
  rootReducer,
  composeWithDevTools(),
);
