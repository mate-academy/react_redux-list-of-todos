import { Todo } from '../types/Todo';

type AddTodos = {
  type: 'todos/ADD',
  payload: Todo [],
};

const addTodos = (todos: Todo[]): AddTodos => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodos };
type Action = AddTodos;
type State = [] | Todo[];

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
