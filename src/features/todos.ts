import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };
type Action = SetAction;

const set = (todos: Todo[]): SetAction => (
  { type: 'todos/SET', payload: todos }
);

export const todosActions = { set };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
