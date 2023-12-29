import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (state: State = null, action: Action): State => {
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
