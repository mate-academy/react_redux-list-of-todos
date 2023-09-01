import { Todo } from '../types/Todo';

type SetAction = {
  type: 'currentTodos/set',
  payload: Todo[],
};

const setTodos = (value: Todo[]): SetAction => ({
  type: 'currentTodos/set',
  payload: value,
});

export const actions = { setTodos };

const todosReducer = (
  todos: Todo[] = [], action: SetAction,
): Todo[] => {
  switch (action.type) {
    case 'currentTodos/set':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
