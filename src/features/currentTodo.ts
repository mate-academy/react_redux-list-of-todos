import { Todo } from '../types/Todo';

export enum ActionType {
  Remove = 'currentTodo/REMOVE',
  Set = 'currentTodo/SET',
}

type RemoveTodoAction = { type: ActionType.Remove };

type SetTodoAction = {
  type: ActionType.Set;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: ActionType.Remove });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: ActionType.Set,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case ActionType.Set:
      return action.payload;

    case ActionType.Remove:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
