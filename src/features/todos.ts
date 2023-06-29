import { Todo } from '../types/Todo';

type LoadTodosAction = {
  type: 'todos/GET';
  payload: Todo[];
};

const loadTodos = (todos: Todo[]): LoadTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

type State = Todo[];
type Action = LoadTodosAction;

export const actions = { loadTodos };

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
