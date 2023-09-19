import { Todo } from '../types/Todo';

export const loadTodos = (todos: Todo[]) => ({
  type: 'LOAD_TODOS',
  payload: todos,
});

export const actions = { loadTodos };

type Action = ReturnType<typeof loadTodos>;

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosReducer = (state = initialState, action: Action): TodosState => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
