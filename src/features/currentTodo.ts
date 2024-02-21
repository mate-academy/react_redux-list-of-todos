import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};
type LoadingTodoAction = {
  type: 'currentTodo/LOADING';
  payload: boolean;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});
const loadTodo = (payload: boolean): LoadingTodoAction => ({
  type: 'currentTodo/LOADING',
  payload,
});

export const actions = { setTodo, removeTodo, loadTodo };

type CurrentTodoState = {
  currentTodo: null | Todo;
  loading: boolean;
};

type Action = SetTodoAction | RemoveTodoAction | LoadingTodoAction;

const initialState: CurrentTodoState = {
  currentTodo: null,
  loading: false,
};

const currentTodoReducer = (
  state: CurrentTodoState = initialState,
  action: Action,
): CurrentTodoState => {
  switch (action.type) {
    case 'currentTodo/SET':
      return { ...state, currentTodo: action.payload };
    case 'currentTodo/REMOVE':
      return { ...state, currentTodo: null };
    case 'currentTodo/LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default currentTodoReducer;
