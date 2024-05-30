import { Todo } from '../types/Todo';

const GET = 'todo/GET';

type GetTodoAction = { type: typeof GET; payload: Todo[] };

type Action = GetTodoAction;

const get = (todos: Todo[]): GetTodoAction => ({
  type: 'todo/GET',
  payload: todos,
});

export const actions = { get };

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/GET':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
