import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todo/ADD';
  payload: Todo[];
};

type Action = AddAction;

const add = (todos: Todo[]): AddAction => ({
  type: 'todo/ADD',
  payload: todos,
});

export const actions = { add };

const todosReducer = (todos:Todo[] = [], action: Action) => {
  switch (action.type) {
    case 'todo/ADD':
      return [...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
