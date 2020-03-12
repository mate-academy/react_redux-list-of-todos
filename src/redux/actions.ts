export const type = {
  SET_IS_LOADED: 'SET_IS_LOADED',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_QUERY_SORT: 'SET_QUERY_SORT',
  SET_TODOS: 'SET_TODOS',
  DELETE_TODO: 'DELETE_TODO',
};

export const setIsLoaded = (value: boolean) => ({
  type: type.SET_IS_LOADED,
  isLoaded: value,
});

export const setIsLoading = (value: boolean) => ({
  type: type.SET_IS_LOADING,
  isLoading: value,
});

export const setQuerySort = (value: string) => ({
  type: type.SET_QUERY_SORT,
  query: value,
});

export const setTodos = (todos: Todo[]) => ({
  type: type.SET_TODOS,
  todos: [...todos],
});

export const setDeleteTodo = (id: number) => ({
  type: type.DELETE_TODO,
  index: id,
});
