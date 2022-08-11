import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'SET_TODOS',
  payload: Todo[]
};

export type TodosAction = SetTodosAction;

export const todosReducer = (todos: Todo[] = [], action: TodosAction) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'SET_TODOS',
    payload: todos,
  }),
};
