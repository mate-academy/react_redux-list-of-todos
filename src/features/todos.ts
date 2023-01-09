import { Todo } from '../types/Todo';

type SetAllTodosAction = {
  type: 'allTodos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetAllTodosAction => ({
  type: 'allTodos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[] | [];
type Action = SetAllTodosAction;

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
