import { Todo } from '../types/Todo';

type LoadTodosAction = {
  type: 'load';
  payload: Todo[];
};

const load = (todos: Todo[]): LoadTodosAction => ({
  type: 'load',
  payload: todos,
});

type Action = LoadTodosAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'load':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { load };

export default todosReducer;
