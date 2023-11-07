import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodoAction = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[];
type Action = SetAction;

export const actions = { setTodoAction };

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
