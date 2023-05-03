import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[] | [];
type Action = SetTodosAction;

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
