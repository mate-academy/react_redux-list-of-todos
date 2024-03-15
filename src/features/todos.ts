import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/GET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[] | [];
type Action = SetTodosAction;

const todosReducer = (
  todos: State = [],

  action: Action,
) => {
  switch (action.type) {
    case 'todos/GET':
      return [...todos, action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
