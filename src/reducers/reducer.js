import {
  LOAD_TODOS, REMOVE_TODO, ADD_TODO, SORT, USER, TITLE,
} from '../constants';

const reducer = (state = {}, {
  type,
  id,
  title,
  username,
  todos,
  sortType,
  currentSorting,
}) => {
  switch (type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: [...todos],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.todo.id !== id),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...todos,
          {
            todo: {
              id,
              title,
            },
            user: {
              username,
            },
          },
        ],
      };
    case SORT:
      if (sortType === currentSorting) {
        return {
          ...state,
          todos: [...state.todos].reverse(),
        };
      }
      if (sortType === USER) {
        return {
          ...state,
          todos: [...state.todos].sort((a, b) => a.user.username.localeCompare(b.user.username)),
        };
      }
      if (sortType === TITLE) {
        return {
          ...state,
          todos: [...state.todos].sort((a, b) => a.todo.title.localeCompare(b.todo.title)),
        };
      }
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.todo.id - b.todo.id),
      };
    default:
      return state;
  }
};

export default reducer;
