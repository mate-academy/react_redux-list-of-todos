import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'allTodos/SET';
  payload: Todo[];
};

const setAllTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'allTodos/SET',
  payload: todos,
});

export const actions = { setAllTodos };

type State = Todo[] | [];
type Action = SetTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'allTodos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
