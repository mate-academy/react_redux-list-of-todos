import { Todo } from '../types/Todo';

const ACTION_CURRENT_TODO_SET = 'currentTodo/SET';
const ACTION_CURRENT_TODO_REMOVE = 'currentTodo/REMOVE';

const ACTION_ACTIVE_TODO_MODAL = 'currentTodo/ACTIVE_MODAL';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: typeof ACTION_CURRENT_TODO_REMOVE };

// payload is a typical name for an action data
type SetTodoAction = {
  type: typeof ACTION_CURRENT_TODO_SET;
  payload: Todo | null;
};

type OpenModalAction = {
  type: typeof ACTION_ACTIVE_TODO_MODAL;
  payload: boolean;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({
  type: ACTION_CURRENT_TODO_REMOVE,
});

const setTodo = (todo: Todo | null): SetTodoAction => ({
  type: ACTION_CURRENT_TODO_SET,
  payload: todo,
});

const activeTodoModal = (active: boolean): OpenModalAction => ({
  type: ACTION_ACTIVE_TODO_MODAL,
  payload: active,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo, activeTodoModal };

type State = {
  modalTodo: boolean;
  todo: Todo | null;
};

type Action = SetTodoAction | RemoveTodoAction | OpenModalAction;

const initialState: State = { modalTodo: false, todo: null };

const currentTodoReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ACTION_ACTIVE_TODO_MODAL:
      return { ...state, modalTodo: action.payload };
    case ACTION_CURRENT_TODO_SET:
      return { ...state, todo: action.payload };
    default:
      return state;
  }
};

export default currentTodoReducer;
