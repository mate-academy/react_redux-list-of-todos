import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { setTodos };

type TodosState = Todo[];
type Action = SetTodos;

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: TodosState = [], action: Action): TodosState => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
