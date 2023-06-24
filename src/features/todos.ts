import { Todo } from '../types/Todo';

type GetTodosAction = {
  type: 'todos/GET',
  payload: Todo[],
};

const getTodos = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

export const actions = { getTodos };

const initialState: Todo[] = [];

type Action = GetTodosAction;

const todosReducer = (state: Todo[] = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
