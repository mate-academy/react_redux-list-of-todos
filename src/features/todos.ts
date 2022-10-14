import { Todo } from '../types/Todo';

type TodoAction = {
  type: 'todo/Todo',
  playload: Todo[]
};

const SetTodo = (todos: Todo[]): TodoAction => ({
  type: 'todo/Todo',
  playload: todos,
});

export const actions = { SetTodo };

const todosReducer = (
  state: Todo[] = [],
  action: TodoAction,
): Todo[] => {
  switch (action.type) {
    case 'todo/Todo':
      return action.playload;
    default:
      return state;
  }
};

export default todosReducer;
