import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'initialTodos/set';
  payload: Todo[];
};

const set = (data: Todo[]): SetTodos => ({
  type: 'initialTodos/set',
  payload: data,
});

type Action = SetTodos;

export const actions = { set };

const initialTodosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'initialTodos/set':
      return action.payload;

    default:
      return state;
  }
};

export default initialTodosReducer;
