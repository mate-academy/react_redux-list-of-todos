import { Todo } from '../types/Todo';
import { CurrentTodoAction } from '../types/CurrentTodoAction';

type RemoveAction = {
  type: CurrentTodoAction.Remove;
};

type SetAction = {
  type: CurrentTodoAction.Set;
  payload: Todo;
};

const removeTodo = (): RemoveAction => ({ type: CurrentTodoAction.Remove });

const setTodo = (todo: Todo): SetAction => ({
  type: CurrentTodoAction.Set,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetAction | RemoveAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
