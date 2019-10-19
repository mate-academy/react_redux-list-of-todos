import { createStore } from 'redux';

const ACTION_TYPES = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  GET_DATA: 'GET_DATA',
};

export const getPreparedData = (todos) => ({
  type: ACTION_TYPES.GET_DATA,
  todos,
});

export const loading = () => ({
  type: ACTION_TYPES.LOADING,
});
export const loaded = () => ({
  type: ACTION_TYPES.LOADED,
});

const initialState = {
  isLoading: false,
  isLoaded: false,
  todos: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case ACTION_TYPES.LOADED: {
      return {
        ...state,
        isLoaded: !state.isLoaded,
      };
    }
    case ACTION_TYPES.GET_DATA: {
      return {
        ...state,
        todos: action.todos,
      };
    }
    default: {
      return state;
    }
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
