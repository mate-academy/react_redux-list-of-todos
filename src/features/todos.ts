import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[]
};

const setTodos = (todo: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todo,
});

export const actions = { setTodos };

type State = Todo[] | null;
type Action = SetTodosAction;

const todosReducer = (
  initialState: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return initialState;
  }
};

export default todosReducer;
