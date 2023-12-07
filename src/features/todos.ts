import { Todo } from '../types/Todo';

type LOAD = {
  type: 'todos/load';
  payload: Todo[];
};

const load = (todos: Todo[]): LOAD => ({
  type: 'todos/load',
  payload: todos,
});

type Action = LOAD;

export const actions = {
  load,
};

const initialState: Todo[] = [];

const todosReducer = (state = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/load':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
