import { createStore } from 'redux';
import { SET_SORT_FIELD, SET_TODOS } from './const';

const initialState = {
  todos: [],
  currentSortField: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
      };
    case SET_SORT_FIELD:
      return {
        ...state,
        currentSortField: action.value,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
