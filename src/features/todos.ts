import { Todo } from '../types/Todo';

type SetAction = { type: 'todos/set'; payload: Todo[] };
type Action = SetAction;

export const actions = {
  set: (todo: Todo[]): SetAction => ({ payload: todo, type: 'todos/set' }),
};

const todosReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
