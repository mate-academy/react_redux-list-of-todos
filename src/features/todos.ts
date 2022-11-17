import { Todo } from '../types/Todo';

type AddTodoAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const add = (todos: Todo[]): AddTodoAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { add };

const todosReducer = (todos: Todo[] = [], action: AddTodoAction): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
