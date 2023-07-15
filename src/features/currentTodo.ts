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
