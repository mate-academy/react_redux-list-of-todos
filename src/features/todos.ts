import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD',
  payload: Todo[],
};

const addTodos = (value: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: value,
});

type Action = AddAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = { addTodos };

export default todosReducer;
