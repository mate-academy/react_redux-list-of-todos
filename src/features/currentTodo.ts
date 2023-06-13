import { Todo } from '../types/Todo';

const REMOVE = 'currentTodo/REMOVE';
const SET = 'currentTodo/SET';

type RemoveTodoAction = { type: typeof REMOVE };

type SetTodoAction = {
  type: typeof SET;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: SET,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case SET:
      return action.payload;

    case REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
