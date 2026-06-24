import { Todo } from '../types/Todo';

const SET = 'todos/SET';

type SetTodosAction = {
  type: typeof SET;
  value: Todo[];
};

const set = (value: Todo[]): SetTodosAction => ({
  type: SET,
  value,
});

type Action = SetTodosAction;

const initialState: Todo[] = [];

const reducer = (state: Todo[] | undefined, action: Action): Todo[] => {
  switch (action.type) {
    case SET:
      return action.value;
    default:
      return state ?? initialState;
  }
};

export const actions = {
  set,
};

export default reducer;
