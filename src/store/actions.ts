export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});

export const changeTodoStatusAction = (payload: number) => ({
  type: CHANGE_TODO_STATUS,
  payload,
});

// export const prepareTodosAction = (payload: {
//   query: string,
//   completionStatus:
// }) => ({
//   type: CHANGE_TODO_STATUS,
//   payload,
// });
