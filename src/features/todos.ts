import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
