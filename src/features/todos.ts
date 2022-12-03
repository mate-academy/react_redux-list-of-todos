import { Todo } from '../types/Todo';

type GetTodos = { type: 'GET_TODOS' };
type GetUser = { type: 'GET_USER' };

type Action = GetTodos | GetUser;

const getTodos = (): GetTodos => ({ type: 'GET_TODOS' });
const getUser = (): GetUser => ({ type: 'GET_USER' });

export const actions = { getTodos, getUser };

const todosReducer = (todos: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'GET_TODOS':
      return todos;

    default:
      return [];
  }
};

export default todosReducer;
