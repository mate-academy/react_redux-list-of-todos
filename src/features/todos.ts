import { Todo } from '../types/Todo';

interface SetTodosAction {
  type: 'SET_TODOS';
  payload: Todo[];
}

interface ToggleLoadingAction {
  type: 'TOGGLE_LOADING';
  payload: boolean;
}

export const setTodos = (todos: Todo[]) => ({
  type: 'SET_TODOS',
  payload: todos,
});

export const toggleLoading = (isLoading: boolean): ToggleLoadingAction => ({
  type: 'TOGGLE_LOADING',
  payload: isLoading,
});

interface StateOfTodos {
  todos: Todo[];
  loading: boolean;
}

const initialState: StateOfTodos = {
  todos: [],
  loading: false,
};

export type TodosAction = SetTodosAction | ToggleLoadingAction;

const todosReducer = (state = initialState, action: TodosAction) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
