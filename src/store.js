import { createStore } from 'redux';

const SET_TODOS = 'set todos';
const CHANGE_LOADING = 'change loading';
const CHANGE_LOADED = 'change loaded';
const CHANGE_ERROR = 'change error';
const CHANGE_SORTEDCOLUMN = 'change sorted column';

export const createSet = value => ({
  type: SET_TODOS, value,
});
export const changeLoading = value => ({
  type: CHANGE_LOADING, value,
});
export const changeLoaded = value => ({
  type: CHANGE_LOADED, value,
});
export const changeError = value => ({
  type: CHANGE_ERROR, value,
});
export const changeSortedColumn = value => ({
  type: CHANGE_SORTEDCOLUMN, value,
});

const initialState = {
  todos: [],
  isLoading: false,
  loaded: false,
  sortedColumn: 'ID',
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
      };
    case CHANGE_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case CHANGE_LOADED:
      return {
        ...state,
        loaded: action.value,
      };
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case CHANGE_SORTEDCOLUMN:
      return {
        ...state,
        sortedColumn: action.value,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
