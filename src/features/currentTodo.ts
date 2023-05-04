import { Action } from 'redux';
import { Todo } from '../types/Todo';
import { ActionTodo } from '../types/ActionTodo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: ActionTodo.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: ActionTodo.SET,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type ActionsTodo = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  ActionFilter: Action,
): State => {
  const action = ActionFilter as ActionsTodo;

  switch (action.type) {
    case ActionTodo.SET:
      return action.payload;
    case ActionTodo.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
