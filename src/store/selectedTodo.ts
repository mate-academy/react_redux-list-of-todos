import { Todo } from '../types/Todo';

type SetCurentTodoAction = {
  type: 'SET_TODO',
  payload: Todo | null
};

export type TodosAction = SetCurentTodoAction;

export const todoReducer = (todo: Todo | null = null, action: TodosAction) => {
  switch (action.type) {
    case 'SET_TODO':
      return action.payload;
    default:
      return todo;
  }
};

export const actions = {
  setTodo: (todo: Todo | null): SetCurentTodoAction => ({
    type: 'SET_TODO',
    payload: todo,
  }),
};
