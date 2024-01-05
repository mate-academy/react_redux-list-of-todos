import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[] | [];

export const actions = { setTodos };

const todosReducer = (state: State = [], action: SetTodosAction): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
