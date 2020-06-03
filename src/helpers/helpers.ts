export const getSortedTodos = (todos: Todo[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((currTodo, nextTodo) => (
        currTodo.title.localeCompare(nextTodo.title)));

    case 'author':
      return [...todos].sort((currTodo, nextTodo) => {
        return (currTodo.user && nextTodo.user)
          ? currTodo.user.name.localeCompare(nextTodo.user.name)
          : 0;
      });

    case 'status':
      return [...todos].sort((currTodo, nextTodo) => {
        return (currTodo.completed === nextTodo.completed)
          ? 0 : currTodo.completed ? -1 : 1;
      });

    default:
      return todos;
  }
};
