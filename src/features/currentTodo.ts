import { RootState } from '../app/store';
import { Todo } from '../types/Todo';

type RemoveAction = { type: 'current-todo/remove' };
type SetAction = { type: 'current-todo/set'; payload: Todo };
type Action = SetAction | RemoveAction;

type State = Todo | null;

export const actions = {
  setTodo: (todo: Todo): SetAction => ({
    type: 'current-todo/set',
    payload: todo,
  }),
  removeTodo: (): RemoveAction => ({ type: 'current-todo/remove' }),
};

const currentTodoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'current-todo/set':
      return action.payload;

    case 'current-todo/remove':
      return null;

    default:
      return state;
  }
};

export const currentTodoSelector = (state: RootState) => state.currentTodo;

export default currentTodoReducer;
