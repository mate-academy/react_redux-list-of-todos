import { Todo } from '../types/Todo';

type State = Todo | null;

type RemoveTodoAction = {
  type: 'currentTodo/REMOVE';
};
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};
type Actions = SetTodoAction | RemoveTodoAction;

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const currentTodoReducer = (state: State = null, action: Actions): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return state;
  }
};

export const actions = { setTodo, removeTodo };
export default currentTodoReducer;
