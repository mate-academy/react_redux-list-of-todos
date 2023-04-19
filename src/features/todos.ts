import { Todo } from '../types/Todo';

type State = Todo[];
type SetTodoAction = { type: 'todos/SET', payload: Todo[] };

export const setTodo = (todos: Todo[]): SetTodoAction => (
  {
    type: 'todos/SET',
    payload: todos,
  }
);

const todosReducer = (state: State = [], action: SetTodoAction): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
