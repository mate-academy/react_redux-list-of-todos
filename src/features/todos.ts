import { Todo } from '../types/Todo';

type FetchTodosAction = {
  type: 'set';
  payload: Todo[];
};

const setTodos = (value: Todo[]): FetchTodosAction => ({
  type: 'set',
  payload: value,
});

const todosReducer = (todos = [], action: FetchTodosAction): Todo[] => {
  switch (action.type) {
    case 'set':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = { setTodos };
export default todosReducer;
