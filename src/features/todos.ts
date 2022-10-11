import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/Set todos', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => (
  { type: 'todos/Set todos', payload: todos }
);

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/Set todos':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
