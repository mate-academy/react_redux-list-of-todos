import { Todo } from '../types/Todo';

type ActionAddTodos = {
  type: 'todos/ADD';
  payload: Todo[];
};

const add = (arg: Todo[]): ActionAddTodos => ({
  type: 'todos/ADD',
  payload: arg,
});

export const actionsTodos = { add };

const todosReducer = (state:Todo[] = [], action:ActionAddTodos): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
