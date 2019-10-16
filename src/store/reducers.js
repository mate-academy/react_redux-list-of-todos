import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import {
  ACTION_TYPES,
  loadTodos,
  setFilterPattern,
  setErrorMessage,
} from './action';

function reducer(state, action) {
  const {
    LOAD_TODOS,
    SET_FILTER_PATTERN,
    SET_ERROR_MESSAGE,
  } = ACTION_TYPES;

  switch (action.type) {
    case LOAD_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case SET_FILTER_PATTERN: {
      return {
        ...state,
        filterPattern: action.payload,
      };
    }

    case SET_ERROR_MESSAGE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  {
    todos: [],
    filterPattern: '',
    error: null,
  },
  devToolsEnhancer(
    loadTodos(),
    setFilterPattern(),
    setErrorMessage()
  )
);
