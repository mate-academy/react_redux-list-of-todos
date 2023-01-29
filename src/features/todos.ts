import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todo/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todo/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
