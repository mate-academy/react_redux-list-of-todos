import { Todo } from '../types/Todo';

export type CurrentTodoState = Todo | null;

const SET_CURRENT = 'currentTodo/SET_CURRENT' as const;
const CLEAR_CURRENT = 'currentTodo/CLEAR_CURRENT' as const;

interface SetCurrentAction {
  type: typeof SET_CURRENT;
  payload: Todo;
}

interface ClearCurrentAction {
  type: typeof CLEAR_CURRENT;
}

export type CurrentTodoAction = SetCurrentAction | ClearCurrentAction;

export const setCurrent = (todo: Todo): SetCurrentAction => ({
  type: SET_CURRENT,
  payload: todo,
});
export const clearCurrent = (): ClearCurrentAction => ({ type: CLEAR_CURRENT });
const initialState: CurrentTodoState = null;

const currentTodoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: CurrentTodoState = initialState,
  action: CurrentTodoAction,
): CurrentTodoState => {
  switch (action.type) {
    case SET_CURRENT:
      return action.payload;
    case CLEAR_CURRENT:
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
