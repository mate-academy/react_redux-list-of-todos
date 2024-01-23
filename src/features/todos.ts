import { Todo } from '../types/Todo';

type TodosAction = { type: 'todos/SET', payload: Todo[] };
type Action = TodosAction;

const setTodos = (todos: Todo[]): TodosAction => (
  { type: 'todos/SET', payload: todos }
);

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = { setTodos };

export default todosReducer;
