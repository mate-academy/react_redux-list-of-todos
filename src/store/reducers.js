import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import {
  ACTION_TYPES,
  loadTodos,
  setFilterPattern,
  setErrorMessage,
} from './action';

export const dataFetch = async(todosUrl, usersUrl) => {
  try {
    const [todosResponse, usersResponse] = await Promise.all([
      fetch(todosUrl),
      fetch(usersUrl),
    ]);

    if (!todosResponse.ok) {
      throw new Error('ToDo list fetch is broken');
    }

    if (!usersResponse.ok) {
      throw new Error('User list fetch is broken');
    }

    const todos = await todosResponse.json();
    const users = await usersResponse.json();

    return ({
      todos,
      users,
    });
  } catch (error) {
    store.dispatch(setErrorMessage(error.message));
  }
};

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
  devToolsEnhancer(loadTodos(), setFilterPattern())
);
