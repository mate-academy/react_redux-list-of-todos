import { Todo } from '../types/Todo';

type GetTodosAction = { type: 'todos/GET', payload: Todo[] };

const getTodos = (value: Todo[]): GetTodosAction => ({
  type: 'todos/GET', payload: value,
});

type Action = GetTodosAction;

export const actions = { getTodos };

const todosReducer = (todos = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
