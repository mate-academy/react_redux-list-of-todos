import { Todo } from '../types/Todo';

type GetTodos = { type: 'GET_TODOS', payload: Todo[] };

const getTodos = (value: Todo[]): GetTodos => ({
  type: 'GET_TODOS',
  payload: value,
});

export const actions = { getTodos };

const todosReducer = (state: Todo[] = [], action: GetTodos): Todo[] => {
  switch (action.type) {
    case 'GET_TODOS':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
