import { Todo } from '../types/Todo';

type GetTodosAction = { type: 'currentTodos/GET', payload: Todo[] };

const getTodos = (todosFromAPI: Todo[]): GetTodosAction => ({
  type: 'currentTodos/GET',
  payload: todosFromAPI,
});

export const actions = { getTodos };

const todosReducer = (
  state: Todo[] = [],
  action: GetTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'currentTodos/GET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
