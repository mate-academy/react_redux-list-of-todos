import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };
type Action = SetTodoAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
