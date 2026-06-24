import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'currentTodos/SET';
  value: Todo;
};

const set = (value: Todo): SetTodoAction => ({
  type: 'currentTodos/SET',
  value,
});

type ClaerTodoAction = {
  type: 'currentTodos/CLEAR';
};

const clear = () => ({
  type: 'currentTodos/CLEAR',
});

type Action = SetTodoAction | ClaerTodoAction;

const initialState: Todo | null = null;

const reducer = (state: Todo | null, action: Action): Todo | null => {
  switch (action.type) {
    case 'currentTodos/SET':
      return action.value;
    case 'currentTodos/CLEAR':
      return initialState;
    default:
      return state ?? initialState;
  }
};

export const actions = {
  set,
  clear,
};

export default reducer;
