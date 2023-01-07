import { Todo } from '../types/Todo';
// eslint-disable-next-line import/no-cycle
import { TodosActions } from '../app/store';

type SetTodosAction = {
  type: TodosActions.Set;
  payload: Todo [];
};

const setTodos = (todos: Todo []): SetTodosAction => ({
  type: TodosActions.Set,
  payload: todos,
});

export const actions = { setTodos };

type State = Todo [] | [];
type Action = SetTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch ((action.type)) {
    case TodosActions.Set: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default todosReducer;
