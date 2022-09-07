import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
export const removeTodo = (): RemoveTodoAction => (
  { type: 'currentTodo/REMOVE' }
);

export const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

interface State {
  todo: Todo | null,
  isTodoLoading: boolean,
}

const initialState: State = {
  todo: null,
  isTodoLoading: false,
};

type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/REMOVE':
      return {
        ...state,
        todo: null,
      };
    case 'currentTodo/SET':
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};

export default currentTodoReducer;
