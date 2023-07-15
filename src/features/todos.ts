import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

type Action = SetAction;

const todosReducer = (todos = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export const actions = { set };

export default todosReducer;
