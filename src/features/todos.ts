import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD',
  payload: Todo[]
};

type Action = AddAction;

const add = (value: Todo[]): Action => ({
  type: 'todos/ADD',
  payload: value,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { add };

export default todosReducer;
