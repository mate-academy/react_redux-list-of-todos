export const SET_SELECTED_TODO = 'todo/SET_SELECTED_TODO';

type SetSelectedTodoAction = {
  type: string;
  payload: number | null;
};
export type SelectedTodo = number | null;

export const SetSelectedTodoActionCreator = (selectedTodo: SelectedTodo) => ({
  type: SET_SELECTED_TODO,
  payload: selectedTodo,
});

export const getSelectedTodo = (state: SelectedTodo): SelectedTodo => state;

const initialState: SelectedTodo = null;

const selectedTodoReduser = (
  state = initialState,
  action: SetSelectedTodoAction,
) => {
  if (action.type === SET_SELECTED_TODO) {
    return action.payload;
  }

  return state;
};

export default selectedTodoReduser;
