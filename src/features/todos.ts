import { Todo } from '../types/Todo';

type GetTodoAction = {
  type: 'todos/GET';
  payload: Todo[];
};

const geAllTodos = (value: Todo[]): GetTodoAction => ({
  type: 'todos/GET',
  payload: value,
});

type Action = GetTodoAction;

const todosReducer = (todos = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { geAllTodos };

export default todosReducer;
