import { Todo } from '../types/Todo';

type TodosGetAction = { type: 'todos/SET'; payload: Todo[] };
type Action = TodosGetAction;

export const get = (todos: Todo[]): TodosGetAction => ({
  type: 'todos/SET',
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
export const actions = { get };
