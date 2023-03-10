import { Todo } from '../types/Todo';

type TodoAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]):TodoAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type Action = TodoAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
