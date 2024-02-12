import { Todo } from '../types/Todo';

type GetAllTodos = {
  type: 'get/todos';
  payload: Todo[];
};

const setAllTodos = (todos: Todo[]): GetAllTodos => ({
  type: 'get/todos',
  payload: todos,
});

export const actions = { setAllTodos };

const todosReducer = (todos: Todo[] = [], action: GetAllTodos): Todo[] => {
  switch (action.type) {
    case 'get/todos':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
