export const Type = {
  LOAD_FROM_API: 'LOAD_FROM_API',
  SORT_BY_NAME: 'SORT_BY_NAME',
  SORT_BY_TITLE: 'SORT_BY_TITLE',
  SORT_BY_COMPLETE: 'SORT_BY_COMPLETE',
  DELETE_TASK: 'DELETE_TASK',
};

export const setTodos = (todos: PreparedTodo[]) => (
  { type: Type.LOAD_FROM_API, payload: { todos } });
export const setSortField = (sort: string) => ({ type: 'sort', payload: { sort } });
export const deleteTask = (id: number) => ({ type: Type.DELETE_TASK, payload: { id } });
