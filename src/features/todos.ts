import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todo/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todo/SET',
  payload: todos,
});

export const actions = { setTodos };

type Todos = Todo[] | [];
type Action = SetTodosAction;

const todosReducer = (
  todos: Todos = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
