import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type Action = SetTodoAction | RemoveTodoAction;

type InitialState = {
  todo: Todo | null;
  modalLoader: boolean;
  openTodoModal: boolean;
};

const initialState: InitialState = {
  todo: null,
  modalLoader: false,
  openTodoModal: false,
};

const currentTodoReducer = (
  state: InitialState = initialState,
  action: Action,
): InitialState => {
  switch (action.type) {
    case 'currentTodo/SET':
      return {
        ...state,
        todo: action.payload,
        openTodoModal: true,
      };
    case 'currentTodo/REMOVE':
      return {
        ...state,
        todo: null,
        openTodoModal: false,
      };

    default:
      return state;
  }
};

export default currentTodoReducer;
