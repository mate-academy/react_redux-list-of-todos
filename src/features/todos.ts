import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/ADD'; payload: Todo[] };

const addTodos = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodos };

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: AddAction): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
