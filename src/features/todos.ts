import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { setTodos };
export default todosReducer;
