import { Todo } from '../types/Todo';

type AddTodosAction = { type: 'todos/ADD', payload: Todo[] };

export const add = (value: Todo[]): AddTodosAction => ({
  type: 'todos/ADD', payload: value,
});

const todosReducer = (
  state: Todo[] | null = null,
  action: AddTodosAction,
): Todo[] | null => {
  switch (action.type) {
    case 'todos/ADD':
      return [
        ...(state || []),
        ...action.payload,
      ];
    default:
      return state;
  }
};

export const actions = { add };

export default todosReducer;
