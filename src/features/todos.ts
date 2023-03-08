import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const initialState: Todo[] = [];

type State = Todo[];
type Action = SetTodosAction;

const todosReducer = (
  state: State = initialState,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
