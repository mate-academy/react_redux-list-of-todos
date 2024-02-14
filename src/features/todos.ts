import { Todo } from '../types/Todo';

type LoadTodosAction = { type: 'todos/LOAD', payload: Todo[] };

const loadTodos = (todos: Todo[]): LoadTodosAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { loadTodos };

type State = Todo[];
type Action = LoadTodosAction;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
