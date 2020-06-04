import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const SET_TODOS = 'SET_TODOS';
const START_LOADING = 'START_LOADING';
const SET_LOADED = 'SET_LOADED';
const SORT_BY = 'SORT_BY';
const DELETE_TODO = 'DELETE_TODO';
const SET_IS_REVERSED = 'SET_IS_REVERSED';
const SET_ERROR = 'SET_ERROR';

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

export const setIsReversed = (isReversed: boolean) => {
  return {
    type: SET_IS_REVERSED,
    isReversed
  };
};

export const setError = (error: string) => {
  return {
    type: SET_ERROR,
    error
  };
};

export const startLoading = () => ({ type: START_LOADING });
export const setIsLoaded = () => ({ type: SET_LOADED });

// Selectors - a function receiving Redux state and returning some data from it
export const getTodos = (state: RootState) => state.todos;
export const getLoading = (state: RootState) => state.loading;
export const getLoaded = (state: RootState) => state.loaded;
export const getSortBy = (state: RootState) => state.sortBy;
export const getError = (state: RootState) => state.error;
export const getIsReversed = (state: RootState) => state.isReversed;
export const getSortedTodos = ({ todos, sortBy, isReversed }: RootState) => {
  const sortedTodos = [...todos];

  switch (sortBy) {
    case 'title':
      sortedTodos.sort((a, b) => (
        a.title.localeCompare(b.title)
      ));
      break;

    case 'completed':
      sortedTodos.sort((a, b) => (
        Number(b.completed) - Number(a.completed)
      ));
      break

    case 'name':
      sortedTodos.sort((a, b) => (
        a.user.name.localeCompare(b.user.name)
      ));
      break;

    default:
      break;
  }

  if (isReversed) {
    sortedTodos.reverse();
  }

  return sortedTodos;
};

// Initial state
const initialState: RootState = {
  todos: [],
  loading: false,
  loaded: false,
  sortBy: '',
  isReversed: false,
  error: ''
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

    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };

    case SET_IS_REVERSED:
      return {
        ...state,
        isReversed: action.isReversed,
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
