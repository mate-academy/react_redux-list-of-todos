import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/ADD', payload: Todo[] };
type Action = AddAction;

const add = (todos: Todo[]): AddAction => ({
  type: 'todos/ADD',
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export const actions = { add };
export default todosReducer;
