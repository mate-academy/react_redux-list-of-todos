import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET', payload: Todo[] };

type Action = SetTodosAction;
type State = Todo[];

const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { setTodos };

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
