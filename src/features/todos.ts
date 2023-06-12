import { Todo } from '../types/Todo';

type SetTododsAction = {
  type: 'todos/SET',
  playload: Todo[],
};

const setTodos = (todos: Todo[]): SetTododsAction => ({
  type: 'todos/SET',
  playload: todos,
});

export const actions = { setTodos };

const todosReducer = (state: Todo[] = [], action: SetTododsAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.playload;
    default:
      return state;
  }
};

export default todosReducer;
