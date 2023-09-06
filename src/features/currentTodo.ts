import { Todo } from '../types/Todo';

enum Type {
  set = 'currentTodo/SET',
  remove = 'currentTodo/REMOVE',
}

type RemoveTodoAction = { type: Type.remove };

type SetTodoAction = {
  type: Type.set;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: Type.remove });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: Type.set,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

let stateTodo = null;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case Type.set:
      stateTodo = action.payload;

      return stateTodo;

    case Type.remove:
      stateTodo = null;

      return stateTodo;

    default:
      return state;
  }
};

export default currentTodoReducer;
