import { Todo } from '../types/Todo';

type LoadTodosAction = {
  type: 'todos/Load',
  payload: Todo[],
};

const setLoadTodos = (todos:Todo[]): LoadTodosAction => ({
  type: 'todos/Load',
  payload: todos,
});

export const actions = { setLoadTodos };

type State = Todo[];
type Action = LoadTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/Load':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
