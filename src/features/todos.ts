import { Todo } from '../types/Todo';

const setTodos = (todos: Todo[]) => ({
  type: 'SET_TODOS' as const,
  payload: todos,
});

interface TodosState {
  todos: Todo[];
}

type TypeActionsTodos = {
  type: 'SET_TODOS';
  payload: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

export const actions = { setTodos };

const todosReducer = (state = initialState, action: TypeActionsTodos) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
