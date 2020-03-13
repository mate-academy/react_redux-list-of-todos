export const sort = (sortBy: string, todos: TodoWithUser[]): TodoWithUser[] => {
  switch (sortBy) {
    case 'name': {
      return [...todos].sort((todoA, todoB) => (
        todoA.user.name.localeCompare(todoB.user.name)
      ));
      break;
    }

    case 'title': {
      return [...todos].sort((todoA, todoB) => (
        todoA.title.localeCompare(todoB.title)
      ));
      break;
    }

    case 'completed': {
      return [...todos].sort((todoA, todoB) => (+todoA.completed - +todoB.completed));
      break;
    }

    default: return todos;
  }
};
