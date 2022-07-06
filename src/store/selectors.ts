export const getTodosSelector = (state: State) => state.todos;
export const getUserByIdSelector = (state: State) => state.user;
export const getFilteredTodosSelector = (query: string) => {
  return (state: State) => (state.todos
    .filter((todo: Todo) => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase())));
};
