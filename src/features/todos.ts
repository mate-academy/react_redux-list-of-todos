import { Todo } from '../types/Todo';

type ClearTodosAction = { type: 'todos/CLEAR' };
type SetTodosAction = { type: 'todos/SET'; payload: Todo[] };

const clearTodos = (): ClearTodosAction => ({ type: 'todos/CLEAR' });
const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos, clearTodos };

type State = Todo[] | [];
type Action = SetTodosAction | ClearTodosAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];

    case 'todos/CLEAR':
      return [];

    default:
      return state;
  }
};

export default todosReducer;
