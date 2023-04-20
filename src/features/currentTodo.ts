import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};
// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});
// These actions will be used in the application

export const actions = { setTodo, removeTodo };

type TodoState = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: TodoState = null,
  action: Action,
): TodoState => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;
    case 'currentTodo/REMOVE':
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
