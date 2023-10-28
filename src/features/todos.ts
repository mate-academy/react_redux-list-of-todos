import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[],
};

export const actions = {
  set: (todos: Todo[]): SetAction => ({
    type: 'todos/SET',
    payload: todos,
  }),
};

const todosReducer = (todos: Todo[] = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
