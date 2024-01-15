import { Todo } from '../types/Todo';

type GetAllAction = {
  type: 'todos/ALL';
  payload: Todo[]
};

const getAll = (todos: Todo[]): GetAllAction => ({
  type: 'todos/ALL',
  payload: todos,
});

export const actions = { getAll };

const todosReducer = (todos = [], action: GetAllAction): Todo[] => {
  switch (action.type) {
    case 'todos/ALL':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
