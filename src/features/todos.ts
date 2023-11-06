import { Todo } from '../types/Todo';

// eslint-disable-next-line
type setAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodoAction = (todos: Todo[]): setAction => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[];
type Action = setAction;

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
