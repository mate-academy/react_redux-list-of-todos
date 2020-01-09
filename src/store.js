import { createStore } from 'redux';

// action types
export const SET_TODOS = 'SET_TODOS';
export const SET_LOADING = 'SET_LOADING';
export const SET_LOADED = 'SET_LOADED';
export const SET_SORT_FIELD = 'SET_SORT_FIELD';

// action creators
export const setTodosAC = value => ({
  type: SET_TODOS, value,
});
export const setLoadingAC = value => ({
  type: SET_LOADING, value,
});
export const setLoadedAC = value => ({
  type: SET_LOADED, value,
});
export const setSortFieldAC = value => ({
  type: SET_SORT_FIELD, value,
});

// selectors
export const getTodos = state => state.todos;
export const getIsLoading = state => state.isLoading;
export const getIsLoaded = state => state.isLoaded;
export const getSortField = state => state.sortField;

// init state
const initialState = {
  todos: [],
  isLoading: false,
  isLoaded: false,
  sortField: 'id',
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
      };
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_LOADED:
      return {
        ...state,
        isLoaded: action.value,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, initialState);

export default store;
