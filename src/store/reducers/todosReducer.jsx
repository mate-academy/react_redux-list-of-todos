import {
  SORT_BY_TYPE,
  GET_TODOS,
  SORT_BY_QUERY,
  SORT_BY_ACTIVE,
  SORT_BY_ALL,
  SORT_BY_COMPLETED,
} from '../types';

const initiateState = {
  sortedBy: '',
  todos: [],
  cachedTodos: [],
};

export const todosReducer = (state = initiateState, action) => {
  switch (action.type) {
    case SORT_BY_TYPE:
      return {
        ...state,
        sortedBy: action.payload,
      };

    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        cachedTodos: action.payload,
      };

    case SORT_BY_QUERY:
      return {
        ...state,
        cachedTodos: state.todos.filter(todo => ((todo.title !== null)
          ? todo.title.includes(action.payload)
          : null)),
      };

    case SORT_BY_ACTIVE:
      return {
        ...state,
        cachedTodos: state.todos.filter(
          todo => todo.completed,
        ),
      };

    case SORT_BY_COMPLETED:
      return {
        ...state,
        cachedTodos: state.todos.filter(
          todo => !todo.completed,
        ),
      };

    case SORT_BY_ALL:
      return {
        ...state,
        cachedTodos: state.todos,
      };

    default:
      return state;
  }
};
