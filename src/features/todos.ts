import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const add = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { add };

const todosReducer = (todos: Todo[] = [], action: AddTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
