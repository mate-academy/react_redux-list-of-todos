import { Todo } from '../types/Todo';

export enum ActionType {
  remove = 'currentTodo/REMOVE',
  set = 'currentTodo/SET',
}

type RemoveTodoAction = { type: ActionType.remove };
type SetTodoAction = {
  type: ActionType.set;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: ActionType.remove });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: ActionType.set,
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
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
