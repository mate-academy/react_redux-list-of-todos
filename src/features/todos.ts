import { Todo } from '../types/Todo';

interface SetAction { type: 'todos/SET', payload: Todo[] }

type Action = SetAction;

const set = (todos: Todo[]): SetAction => (
  { type: 'todos/SET', payload: todos }
);

export const actions = { set };

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
