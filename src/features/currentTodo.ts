import { Todo } from '../types/Todo';

export enum ActionsType {
  SELECT_TODO = 'SELECT_TODO',
  RESET_TODO = 'RESET_TODO',
}

const initialState = {
  selectedTodo: null,
};

export const actions = {
  selectTodo: (todo:Todo) => (
    { type: ActionsType.SELECT_TODO, todo }
  ),
  resetTodo: () => (
    { type: ActionsType.SELECT_TODO, todo: null }
  ),
};

export const currentTodoReducer = (
  state = initialState,
  action: { type: ActionsType; todo: Todo | null },
) => {
  switch (action.type) {
    case ActionsType.SELECT_TODO:
      return {
        ...state,
        selectedTodo: action.todo,
      };

    case ActionsType.RESET_TODO:
      return {
        ...state,
        selectedTodo: null,
      };

    default:
      return state;
  }
};
