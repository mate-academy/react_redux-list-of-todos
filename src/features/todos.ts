import { Todo } from '../types/Todo';

export type SetTodosAction = { type: 'todos/ADD', payload: Todo[] };

const setTodos = (todos: Todo[]):SetTodosAction => (
  { type: 'todos/ADD', payload: todos });

export const actions = { setTodos };

type Action = SetTodosAction;
type State = Todo[] | null;

const todosReducer = (state: State = null, action: Action): Todo[] | null => {
  if (action.type === 'todos/ADD') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
