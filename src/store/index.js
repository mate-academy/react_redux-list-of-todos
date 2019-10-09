import { createStore } from 'redux';

// action types
const ACTION_TYPES = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  GET_TODOS: 'GET_TODOS',
};

// action creators
export const loading = () => ({
  type: ACTION_TYPES.LOADING,
});

export const loaded = () => ({
  type: ACTION_TYPES.LOADED,
});

export const getTodosWithUsers = (todos, users) => ({
  type: ACTION_TYPES.GET_TODOS,
  todos,
  users,
});

const initialState = {
  todos: [],
  isLoading: false,
  isLoaded: false,
};

function reducer(state = initialState, action={}) {
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
    case ACTION_TYPES.GET_TODOS: {
      return {
        ...state,
        todos: action.todos.map(todo => ({
          ...todo,
          user: action.users.find(item => item.id === todo.userId),
        })),
      };
    }
    default:
      return state;
  }
}

export const store = createStore(reducer);
