import { Todo } from '../types/Todo';

export const SET_TODOS = 'todos/SET_TODOS';

type SetTodoAction = {
  type: typeof SET_TODOS;
  payload: Todo[];
};

export const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: SET_TODOS,
  payload: todos,
});

const initialState: Todo[] = [];

const todosReducer = (state = initialState, action: SetTodoAction): Todo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
