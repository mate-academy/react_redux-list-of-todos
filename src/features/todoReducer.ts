import { Todo } from '../types/Todo';

const SET_TODO = 'currentTodo/setTodo';
const REMOVE_TODO = 'currentTodo/removeTodo';

type RemoveTodoAction = { type: typeof REMOVE_TODO };
type SetTodoAction = { type: typeof SET_TODO; payload: Todo };

const removeTodo = (): RemoveTodoAction => ({ type: REMOVE_TODO });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: SET_TODO,
  payload: todo,
});

export const actions = {
  setTodo,
  removeTodo,
} as const;

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const initialState: State = null;

const todoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case SET_TODO:
      return action.payload;

    case REMOVE_TODO:
      return null;

    default:
      return state;
  }
};

export default todoReducer;
