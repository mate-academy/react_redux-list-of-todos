import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/set',
  payload: Todo[]
};

const setTodos = (todo: Todo[]): SetTodoAction => ({
  type: 'todos/set',
  payload: todo,
});

type Action = SetTodoAction;
type State = Todo[];

export const actions = { setTodos };

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
