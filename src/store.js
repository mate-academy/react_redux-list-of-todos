import { createStore } from 'redux';

const initialState = {
  todos: [],
  isLoading: false,
  loaded: false,
  error: false,
  sortedColumn: '',
};

const SET_TODOS = 'SET_TODOS';
const SET_LOADING = 'SET_LOADING';
const SET_LOADED = 'SET_LOADED';
const SET_ERROR = 'SET_ERROR';
const SET_SORTED_COLUMN = 'SET_SORTED_COLUMN';

export const setTodosFromStore = value => ({
  type: SET_TODOS,
  value,
});

export const setErrorFromStore = value => ({
  type: SET_ERROR,
  value,
});

export const setLoadingFromStore = value => ({
  type: SET_LOADING,
  value,
});

export const setLoadedFromStore = value => ({
  type: SET_LOADED,
  value,
});

export const setSortedColumnFromStore = value => ({
  type: SET_SORTED_COLUMN,
  value,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_LOADED:
      return {
        ...state,
        loaded: action.value,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case SET_SORTED_COLUMN:
      return {
        ...state,
        sortedColumn: action.value,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, initialState);

export default store;
