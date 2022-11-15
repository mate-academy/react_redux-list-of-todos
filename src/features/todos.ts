import { Todo } from '../types/Todo';

type GetTodos = {
  type: 'todos/GET',
  payload: Todo[],
};

const getAllTodos = (value: Todo[]): GetTodos => ({
  type: 'todos/GET',
  payload: value,
});

export const actions = { getAllTodos };

const todosReducer = (todos: Todo[] = [], action: GetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
