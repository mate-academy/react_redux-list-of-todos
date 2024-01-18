import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET_TODOS';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

export const todosActions = { setTodos };

type TodosState = {
  data: Todo[];
  loading: boolean;
};

const initialTodosState: TodosState = {
  data: [],
  loading: true,
};

const todosReducer = (
  state: TodosState = initialTodosState,
  action: SetTodosAction,
): TodosState => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todosReducer;
