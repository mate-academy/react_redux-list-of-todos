import { Todo } from '../types/Todo';

type GetTodosAction = { type: 'todos/GET', payload: Todo[] };

const getTodos = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

type Action = GetTodosAction;

export const actions = { getTodos };

type State = Todo[] | [];

const todosReducer = (state: State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
