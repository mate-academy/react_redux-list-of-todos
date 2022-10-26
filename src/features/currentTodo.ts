import type { RootState } from '../app/store';
import { Todo } from '../types/Todo';

export enum TodoActionType {
  setCurrentTodo = 'currentTodo/SET',
  removeCurrentTodo = 'currentTodo/REMOVE',
}

type RemoveTodoAction = { type: TodoActionType.removeCurrentTodo };

type SetTodoAction = {
  type: TodoActionType.setCurrentTodo;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({
  type: TodoActionType.removeCurrentTodo,
});

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TodoActionType.setCurrentTodo,
  payload: todo,
});

export const actions = { setTodo, removeTodo };
export const TODO_ACTIONS = { setTodo, removeTodo };

export const TODO_SELECTORS = {
  getCurrentTodo: (state: RootState) => state.currentTodo,
};

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;
const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case TodoActionType.setCurrentTodo:
      return action.payload;
    case TodoActionType.removeCurrentTodo:
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
