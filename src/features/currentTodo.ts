import { Todo } from '../types/Todo';

enum ActionType {
  TODO_REMOVE = 'currentTodo/REMOVE',
  TODO_SET = 'currentTodo/SET',
}

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
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
    case ActionType.TODO_SET:
      return action.payload;

    case ActionType.TODO_REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
