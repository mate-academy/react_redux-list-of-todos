import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const add = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { add };

type Action = AddAction;

const todosReducer = (action: Action, todos = []) => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
