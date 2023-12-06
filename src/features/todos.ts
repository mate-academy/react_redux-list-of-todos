import { Todo } from '../types/Todo';

type Action = {
  type: 'todo/SET',
  payload: Todo[],
};

const set = (todos: Todo[]): Action => ({
  type: 'todo/SET',
  payload: todos,
});

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;
    default:
      return state;
  }
};

export const actions = { set };

export default todosReducer;
