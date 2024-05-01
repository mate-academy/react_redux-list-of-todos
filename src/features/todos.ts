import { Todo } from '../types/Todo';

type LoadAction = {
  type: 'todos/LoadTodos';
  payload: Todo[];
};

type Actions = {
  type: 'todos/LoadTodos';
  payload: Todo[];
};

const addTodos = (payload: Todo[]): LoadAction => ({
  type: 'todos/LoadTodos',
  payload,
});

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/LoadTodos':
      return [...action.payload];
    default:
      return state;
  }
};

export const actions = {
  addTodos,
};

export default todosReducer;
