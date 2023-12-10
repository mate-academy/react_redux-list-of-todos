import { Todo } from '../types/Todo';

const TODOS = 'todos';

type AddTodosAction = {
  type: typeof TODOS,
  value: Todo[]
};

export const actionsTodos = {
  addTodos: (value: Todo[]): AddTodosAction => ({
    type: TODOS,
    value,
  }),
};

const todosReducer = (todos: Todo[] = [], action: AddTodosAction): Todo[] => {
  if (action.type === TODOS) {
    return action.value;
  }

  return todos;
};

export default todosReducer;
