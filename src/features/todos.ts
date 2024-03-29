import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const addTodos = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

type Action = AddAction;
// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: Action) => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    default:
      return todos;
  }
};

export const todosActions = { addTodos };
export default todosReducer;
