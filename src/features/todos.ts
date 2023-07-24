import { Todo } from '../types/Todo';

type GetTodoAction = {
  type: 'allTodo/GET';
  payload: Todo[];
};

const getTodos = (todos: Todo[]): GetTodoAction => ({
  type: 'allTodo/GET',
  payload: todos,
});

export const actions = { getTodos };

type State = Todo[];
type Action = GetTodoAction;

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'allTodo/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
