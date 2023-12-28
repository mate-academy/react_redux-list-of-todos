import { Todo } from '../types/Todo';

const TODOS = 'todos';

type ADDTodosAction = {
  type: typeof TODOS,
  value: Todo[],
};

export const actionsTodos = {
  addTodos: (value: Todo[]): ADDTodosAction => ({
    type: TODOS,
    value,
  }),
};

const todosReducer = (todos: Todo[] = [], action: ADDTodosAction): Todo[] => {
  if (action.type === TODOS) {
    return action.value;
  }

  return todos;
};

export default todosReducer;
