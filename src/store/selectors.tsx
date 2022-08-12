export const getTodosSelector = (state: State) => state.todos;
export const getFilteredTodosSelector = (titles: string) => {
  return (state: State) => (state.todos
    .filter((todo: Todo) => todo.title.toLocaleLowerCase()
      .includes(titles.toLocaleLowerCase())));
};

export const getUserSelector = (state: State) => state.user;
