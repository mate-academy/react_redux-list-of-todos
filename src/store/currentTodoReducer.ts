import { Todo } from '../react-app-env';

const initialState: TodoState = {

  todo: null,
};

export type Todoselected = {
  type: 'TODO_SELECT',
  payload: Todo | null,
};

export type ResetTodo = {
  type: 'TODO_RESET',
};

export type ActionTodo = (
  Todoselected
  | ResetTodo
);

export type TodoState = {
  todo: Todo | null;
};

export const userReducer = (
  state = initialState,
  action: ActionTodo,
): TodoState => {
  switch (action.type) {
    case 'TODO_SELECT':
      return {
        ...state,
        todo: action.payload,
      };

    case 'TODO_RESET':
      return {
        ...state,
        todo: null,
      };
    default:
      return state;
  }
};

export const actionTodo = {

};

export const actions = {
  setTodo: (payload: Todo): Todoselected => ({
    type: 'TODO_SELECT',
    payload,
  }),

  resetTodo: ():ResetTodo => ({
    type: 'TODO_RESET',
  }),
};
