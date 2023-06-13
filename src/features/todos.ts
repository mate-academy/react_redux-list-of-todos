import { Todo } from '../types/Todo';

const SET = 'todos/SET';

type SetTodosAction = {
  type: typeof SET,
  payload: Todo[]
};

const setTodos = (todo: Todo[]): SetTodosAction => ({
  type: SET,
  payload: todo,
});

export const actions = { setTodos };

type State = Todo[] | null;
type Action = SetTodosAction;

const todosReducer = (
  initialState: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case SET:
      return [...action.payload];

    default:
      return initialState;
  }
};

export default todosReducer;
