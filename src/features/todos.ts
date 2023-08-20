import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET', payload: Todo[] };

export const actions = {
  setTodos: (value: Todo[]): SetTodosAction => (
    { type: 'todos/SET', payload: value }
  ),
};

type State = Todo[];
type Action = SetTodosAction;

const initialTodos: State = [];

const todosReducer = (state = initialTodos, action: Action): Todo[] => {
  switch (action.type) {
    case ('todos/SET'):
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
