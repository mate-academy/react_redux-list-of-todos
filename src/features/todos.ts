import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

type Action = AddAction;

const add = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { add };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
