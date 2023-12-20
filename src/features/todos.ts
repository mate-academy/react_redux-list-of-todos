import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

type Action = SetTodos;

const setTodos = (value: Todo[]): SetTodos => ({
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
