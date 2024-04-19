import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type CurrentState = {
  currentTodo: Todo | null;
};

const initialState: CurrentState = {
  currentTodo: null,
};

type Action = SetTodoAction | RemoveTodoAction;
const currentTodoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: Action,
): CurrentState => {
  switch (action.type) {
    case 'currentTodo/SET':
      return { ...state, currentTodo: action.payload };

    case 'currentTodo/REMOVE':
      return { ...state, currentTodo: null };

    default:
      return state;
  }
};

export default currentTodoReducer;
