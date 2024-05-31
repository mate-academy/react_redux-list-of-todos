import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
