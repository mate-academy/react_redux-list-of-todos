import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/GET',
  payload: Todo[],
};

const SetTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

export const actions = { SetTodos };

type State = Todo[];

type Action = SetTodosAction;

const todosReducer = (
  state: State = [],
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
