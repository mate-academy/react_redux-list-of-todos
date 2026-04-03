import { Todo } from '../types/Todo';

const SET_TODOS = 'todos/SET' as const;

interface SetTodosAction {
  type: typeof SET_TODOS;
  paylaod: Todo[];
}

export const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: SET_TODOS,
  paylaod: todos,
});

type TodosAction = SetTodosAction;

const initialState: Todo[] = [];

const todosReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: Todo[] = initialState,
  action: TodosAction,
): Todo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.paylaod;

    default:
      return state;
  }
};

export default todosReducer;
