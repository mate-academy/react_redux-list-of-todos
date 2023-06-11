import { Todo } from '../types/Todo';

export enum CurrentTodoActionTypes {
  remove = 'currentTodo/REMOVE',
  set = 'currentTodo/SET',
}

type RemoveTodoAction = { type: CurrentTodoActionTypes.remove };
type SetTodoAction = {
  type: CurrentTodoActionTypes.set;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({
  type: CurrentTodoActionTypes.remove,
});

const setTodo = (todo: Todo): SetTodoAction => ({
  type: CurrentTodoActionTypes.set,
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
    case CurrentTodoActionTypes.set:
      return action.payload;

    case CurrentTodoActionTypes.remove:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
