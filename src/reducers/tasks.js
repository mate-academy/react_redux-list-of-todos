import { LOAD_TODOS, REMOVE_TODO, ADD_TODO, SORT, USER, ID, TITLE } from '../constants';

const tasks = (state = [], {
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
      return [
        ...todos,
      ];
    case REMOVE_TODO:
      return [
        ...state.filter(todo => todo.todo.id !== id),
      ];
    case ADD_TODO:
      return [
        ...state,
        {
          todo: {
            id,
            title,
          },
          user: {
            username,
          },
        },
      ];
    case SORT:
      if (sortType === currentSorting) {
        return [
          ...state.reverse(),
        ];
      }
      if (sortType === USER) {
        return [
          ...state.sort((a, b) => a.user.username.localeCompare(b.user.username)),
        ];
      }
      if (sortType === TITLE) {
        return [
          ...state.sort((a, b) => a.todo.title.localeCompare(b.todo.title)),
        ];
      }
      return [
        ...state.sort((a, b) => a.todo.id - b.todo.id),
      ];
    default:
      return state;
  }
};

export default tasks;
