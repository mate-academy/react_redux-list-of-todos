import { Todo } from '../types/Todo';

const SET = 'todos/SET';
const initialState: Todo[] = [];

type SetTodosAction = {
  type: typeof SET;
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: SET,
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos = initialState, action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case SET:
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
