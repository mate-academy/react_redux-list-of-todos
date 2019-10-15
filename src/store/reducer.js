import { ACTION_TYPES } from './actions';

const initialState = {
  isLoad: false,
  todos: [],
  users: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_LOADING:
      return {
        ...state,
      };
    case ACTION_TYPES.TODOS_LIST_LOADED:
      return {
        ...state,
        todos: action.payload,
      };

    case ACTION_TYPES.USERS_LIST_LOADED:
      return {
        ...state,
        users: action.payload,
        isLoad: true,
      };

    case ACTION_TYPES.TODO_DELETE:
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.payload)],
      };
    default:
      return state;
  }
};
