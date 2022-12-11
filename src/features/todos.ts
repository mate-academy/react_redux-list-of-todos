import { Todo } from '../types/Todo';

type GetTodos = {
  type: 'todos/GetAll',
  payload: Todo[],
};

type Actions = GetTodos;

const getTodos = (todos: Todo[]): GetTodos => ({
  type: 'todos/GetAll',
  payload: todos,
});

export const actions = { getTodos };

type State = Todo[];

const todosReducer = (state: State = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/GetAll':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
