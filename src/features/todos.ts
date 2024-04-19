import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type Action = SetAction;

const set = (value: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { set };

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
