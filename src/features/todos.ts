import { Todo } from '../types/Todo';

type InitTodosAction = { type: 'todos/INIT', payload: Todo[] };

const initTodosAction = (todos: Todo[]): InitTodosAction => ({
  type: 'todos/INIT',
  payload: todos,
});

export const actions = { initTodosAction };

const todosReducer = (todos: Todo[] = [], action: InitTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/INIT':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
