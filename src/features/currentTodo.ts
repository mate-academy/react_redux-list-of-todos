import { Todo } from '../types/Todo';

const TODO_SET = 'currentTodo/SET';
const TODO_REMOVE = 'currentTodo/REMOVE';

type RemoveTodoAction = { type: typeof TODO_REMOVE };

type SetTodoAction = {
  type: typeof TODO_SET;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: TODO_REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TODO_SET,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const currentTodoReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case TODO_SET:
      return action.payload;

    case TODO_REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
