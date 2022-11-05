import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET', payload: todos,
});

export const actions = {
  setTodos,
};

type Action = SetTodosAction;

type State = Todo[] | null;

const todosReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
