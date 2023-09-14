import { Todo } from '../types/Todo';

enum ActionType {
  SET = 'currentTodo/SET',
  REMOVE = 'currentTodo/REMOVE',
}

type RemoveTodoAction = { type: ActionType.REMOVE };

type SetTodoAction = {
  type: ActionType.SET;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: ActionType.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: ActionType.SET,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case ActionType.SET:
      return action.payload;

    case ActionType.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
