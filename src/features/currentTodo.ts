import { Todo } from '../types/Todo';

type InitialState = Todo | null;

type SetCurrentTodoAction = { type: 'currentTodo/SET'; payload: Todo };
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };
type Actions = SetCurrentTodoAction | RemoveTodoAction;

const setTodo = (todo: Todo): SetCurrentTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const removeTodo = (): RemoveTodoAction => ({
  type: 'currentTodo/REMOVE',
});

export const currentTodosReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: InitialState = null,
  action: Actions,
): InitialState => {
  switch (action.type) {
    case 'currentTodo/SET':
      return { ...action.payload };
    case 'currentTodo/REMOVE':
      return null;
    default:
      return state;
  }
};

export const actions = { setTodo, removeTodo };
