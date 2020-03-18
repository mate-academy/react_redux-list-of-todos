import { Type } from '../actions/actionCreator';
import { InitialState } from '../redux/rootReducer';

export const getSortedTodos = (state: InitialState): PreparedTodo[] => {
  const { todos, field } = state;

  switch (field) {
    case Type.SORT_BY_NAME:
      return [...todos].sort((a, b) => a.user.name.localeCompare(b.user.name));

    case Type.SORT_BY_TITLE:
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case Type.SORT_BY_COMPLETE:
      return [...todos].sort((a, b) => Number(b.completed) - Number(a.completed));
    default:
      return todos;
  }
};
