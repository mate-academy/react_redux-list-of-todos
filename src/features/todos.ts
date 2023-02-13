import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const add = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

type Action = AddAction;

export const actions = add;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
