import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/ADD',
  payload: todos,
});

type Action = AddTodosAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return state;
  }
};

export const todosActions = { addTodos };
export default todosReducer;
