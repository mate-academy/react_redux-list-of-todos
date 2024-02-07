import { Todo } from '../types/Todo';

type GetTodoAction = {
  type: 'todos/GET';
  payload: Todo[];
};

type Action = GetTodoAction;

const getTodo = (data: Todo[]): GetTodoAction => ({
  type: 'todos/GET',
  payload: data,
});

export const actions = { getTodo };

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
