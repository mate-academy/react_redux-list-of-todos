import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  playload: Todo[]
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  playload: todos,
});

export const actions = { setTodos };

type State = Todo[] | [];
type Action = SetTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.playload;
    default:
      return state;
  }
};

export default todosReducer;
