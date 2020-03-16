export const Type = {
  LOAD_FROM_API: 'LOAD_FROM_API',
  SORT_BY_NAME: 'SORT_BY_NAME',
  SORT_BY_TITLE: 'SORT_BY_TITLE',
  SORT_BY_COMPLETE: 'SORT_BY_COMPLETE',
  DELETE_TASK: 'DELETE_TASK',
};

export const setTodos = (todos: PreparedTodo[]) => (
  { type: Type.LOAD_FROM_API, payload: { todos } });
export const sortByName = () => ({ type: Type.SORT_BY_NAME });
export const sortByTitle = () => ({ type: Type.SORT_BY_TITLE });
export const sortByComplete = () => ({ type: Type.SORT_BY_COMPLETE });
export const deleteTask = (id: number) => ({ type: Type.DELETE_TASK, payload: { id } });
