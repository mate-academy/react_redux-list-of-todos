import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/SET', payload: Todo[] };

const set = (value: Todo[]): SetAction => (
  {
    type: 'todos/SET',
    payload: value,
  }
);

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
