import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };
type ResetAction = { type: 'todos/RESET' };

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});
const resetTodos = (): ResetAction => ({ type: 'todos/RESET' });

export const actions = { setTodos, resetTodos };

export type Action = SetAction | ResetAction;

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    case 'todos/RESET':
      return [];
    default:
      return todos;
  }
};

export default todosReducer;
