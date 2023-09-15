import { Todo } from '../types/Todo';

enum CurrentTodoActionTypes {
  SET = 'currentTodo/SET',
  REMOVE = 'currentTodo/REMOVE',
}

type RemoveTodoAction = { type: CurrentTodoActionTypes.REMOVE };

type SetTodoAction = {
  type: CurrentTodoActionTypes.SET;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({
  type: CurrentTodoActionTypes.REMOVE,
});

const setTodo = (todo: Todo): SetTodoAction => ({
  type: CurrentTodoActionTypes.SET,
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
    case CurrentTodoActionTypes.SET:
      return action.payload;

    case CurrentTodoActionTypes.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
