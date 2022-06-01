export const getFilteredTodo = (
  todos: Todo[],
  appliedQuery: string,
  status: string,
) => {
  const filteredTodos = todos.filter(({ title }) => {
    const changeTitle = title.toLowerCase();

    return changeTitle.includes(appliedQuery.toLowerCase());
  });

  switch (status) {
    case 'Active':
      return filteredTodos.filter(({ completed }) => !completed);

    case 'Completed':
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
};
