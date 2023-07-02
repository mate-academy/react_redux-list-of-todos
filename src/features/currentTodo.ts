import { Todo } from '../types/Todo';

enum TodoActionTypes {
  SetTodo = 'currentTodo/SET',
  RemoveTodo = 'currentTodo/REMOVE',
}

type RemoveTodoAction = { type: TodoActionTypes.RemoveTodo };

type SetTodoAction = {
  type: TodoActionTypes.SetTodo;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({
  type: TodoActionTypes.RemoveTodo,
});
const setTodo = (payload: Todo): SetTodoAction => ({
  type: TodoActionTypes.SetTodo, payload,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case TodoActionTypes.SetTodo:
      return action.payload;

    case TodoActionTypes.RemoveTodo:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
