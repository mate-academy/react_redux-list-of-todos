export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export enum TodoActionTypes {
  SET_TODOS = 'todos/SET',
  LOAD_TODOS = 'todos/LOAD',
  ERROR_TODOS = 'todos/ERROR',
}

export enum FilterActionTypes {
  SET_CATEGORY_FILTER = 'filter/SET_CATEGORY',
  SET_QUERY_FILTER = 'filter/SET_QUERY',
  CLEAR_QUERY_FILTER = 'filter/SET_FILTER',
}

export enum CurrenTodoActionTypes {
  SET_TODO = 'currentTodo/SET',
  REMOVE_TODO = 'currentTodo/REMOVE',
}
