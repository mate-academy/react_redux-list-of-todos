import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

export enum TodosActionType {
  SetTodo = 'currentTodo/SET',
  RemoveTodo = 'currentTodo/REMOVE',
}

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case TodosActionType.SetTodo:
      return action.payload;

    case TodosActionType.RemoveTodo:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
