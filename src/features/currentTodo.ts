import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

type SetTodoAction = { type: 'todo/set'; payload: Todo };
type DeleteTodoAction = { type: 'todo/delete' };

type Action = SetTodoAction | DeleteTodoAction;

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'todo/set',
  payload: todo,
});

const deletTodo = (): DeleteTodoAction => ({
  type: 'todo/delete',
});

export const reducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: Action,
): typeof initialState => {
  switch (action.type) {
    case 'todo/set':
      return action.payload;

    case 'todo/delete':
      return null;

    default:
      return state;
  }
};

export const actions = {
  setTodo,
  deletTodo,
};
