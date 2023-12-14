import { Todo } from '../types/Todo';

const TODOS = 'todos/set';

type TTodosAction = { type: typeof TODOS; payload: Todo[] };

const setTodos = (todos: Todo[]):TTodosAction => (
  { type: TODOS, payload: todos }
);

const todosReducer = (state: Todo[] = [], action: TTodosAction): Todo[] => {
  return action.type === TODOS
    ? [...state, ...action.payload]
    : state;
};

export const actions = { setTodos };
export default todosReducer;
