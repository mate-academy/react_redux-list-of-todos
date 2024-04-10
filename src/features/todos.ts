import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: value,
});

type Action = SetTodos;

export const actions = { setTodos };
/* eslint-disable @typescript-eslint/default-param-last */
const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
