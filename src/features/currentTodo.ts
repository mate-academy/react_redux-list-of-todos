import { Todo } from '../types/Todo';

enum TypeCurTodo {
  Remove = 'currentTodo/REMOVE',
  Set = 'currentTodo/SET',
}

type RemoveTodoAction = { type: TypeCurTodo.Remove };
type SetTodoAction = {
  type: TypeCurTodo.Set;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: TypeCurTodo.Remove });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: TypeCurTodo.Set,
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
    case TypeCurTodo.Remove:
      return null;
    case TypeCurTodo.Set:
      return action.payload;
    default:
      return state;
  }
};

export default currentTodoReducer;
