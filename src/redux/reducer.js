import {
  REQUESTED,
  DISPLAY_USERS,
  DISPLAY_TODOS,
  FILTER_CHANGED,
  REMOVE_TODO_ITEM,
} from './actions';

const initialState = {
  requested: false,
  loadedUsers: false,
  loadedTodos: false,
  todos: null,
  users: null,
  filteredTodos: null,
};

const actionHandlers = {
  [REQUESTED]: state => ({
    ...state,
    requested: true,
  }),
  [DISPLAY_USERS]: (state, action) => ({
    ...state,
    loadedUsers: action.payload.loadedUsers,
    users: action.payload.users,
  }),

  [DISPLAY_TODOS]: (state, action) => ({
    ...state,
    loadedTodos: true,
    todos: action.payload.todos,
    filteredTodos: action.payload.todos,
  }),
  [FILTER_CHANGED]: (state, action) => ({
    ...state,
    filteredTodos: state.todos.filter(todo => todo.title.includes(action.payload.target.value)),
  }),
  [REMOVE_TODO_ITEM]: (state, action) => {
    const newTodos = state.todos.filter((todo, index) => index !== action.payload);
    return {
      ...state,
      filteredTodos: newTodos,
      todos: newTodos,
    };
  },
};

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler
    ? handler(state, action)
    : state;
};
