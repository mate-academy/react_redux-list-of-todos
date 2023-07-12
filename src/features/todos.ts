import { Todo } from '../types/Todo';

type GetAction = { type: 'todos/GET', payload: Todo[] };
type Action = GetAction;

const get = (todos: Todo[]): GetAction => (
  { type: 'todos/GET', payload: todos }
);

export const todosActions = { get };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
