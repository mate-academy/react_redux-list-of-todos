import {
  DISPLAY,
  LOAD_USER,
  LOAD_TODO,
  DISPLAY_TODOS,
  REMOVE,
} from './actions';

const initialState = {
  requested: false,
  requestedUsers: false,
  users: null,
  todos: null,
};

// eslint-disable-next-line import/prefer-default-export
export function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        requestedUsers: true,
      };
    case DISPLAY:
      return {
        ...state,
        users: action.users,
      };
    case LOAD_TODO:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((item, index) => {
          return index !== action.index;
        }),
      };
    default:
      return state;
  }
}
