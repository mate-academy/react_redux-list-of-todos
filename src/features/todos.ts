import { Todo } from '../types/Todo';

type Action = { type: 'todos/SET'; payload: Todo[] };

const setTodos = (value: Todo[]): Action => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { setTodos };

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
