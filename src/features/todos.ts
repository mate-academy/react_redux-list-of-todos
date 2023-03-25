import { Todo } from '../types/Todo';

type GetTodoAction = {
  type: 'currentTodos/GET';
  payload: Todo[];
};

const getTodos = (todos: Todo[]): GetTodoAction => ({
  type: 'currentTodos/GET',
  payload: todos,
});

export const actions = { getTodos };
type State = Todo[] | [];

const todosReducer = (state: State = [], action: GetTodoAction): Todo[] => {
  switch (action.type) {
    case 'currentTodos/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
