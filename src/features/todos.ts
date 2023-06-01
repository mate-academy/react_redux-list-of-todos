import { Todo } from '../types/Todo';

type TodoAddAction = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (value: Todo[]):TodoAddAction => ({
  type: 'todos/SET',
  payload: value,
});

type State = Todo[] | null;

const todosReducer = (
  state: State = null,
  action: TodoAddAction,
): Todo[] | null => {
  switch (action.type) {
    case 'todos/SET':
      return [
        ...(state || []),
        ...action.payload,
      ];
    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
