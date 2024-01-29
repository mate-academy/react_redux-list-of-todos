import { Todo } from '../types/Todo';

type GetTodoAction = {
  type: 'todos/GET';
  payload: Todo[];
};

const getTodos = (value: Todo[]): GetTodoAction => ({
  type: 'todos/GET',
  payload: value,
});

export const actions = { getTodos };

type Action = GetTodoAction;

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
