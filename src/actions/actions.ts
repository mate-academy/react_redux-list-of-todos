export const TYPE_LOADING = 'loading';
export const TYPE_SET_TODOS = 'set_todos';
export const TYPE_SORT = 'sort';
export const TYPE_DELETE = 'delete';

export const setLoading = (isLoading: boolean) => ({
  type: TYPE_LOADING,
  payload: isLoading,
});

export const setTodos = (todos: TodoWithUser[]) => ({
  type: TYPE_SET_TODOS,
  payload: todos,
});

export const setSort = (sortBy: string) => ({
  type: TYPE_SORT,
  payload: sortBy,
});

export const deleteTodo = (id: number) => ({
  type: TYPE_DELETE,
  payload: id,
});
