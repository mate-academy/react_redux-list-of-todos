import { TodosAction, TodosActionTypes, TodosState } from '../../types/Todo';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  todo: null,
};

export const todosReducer = (
  state = initialState,
  action: TodosAction,
) : TodosState => {
  switch (action.type) {
    case TodosActionTypes.FETCH_TODOS:
      return {
        todos: [],
        loading: true,
        error: null,
        todo: null,
      };
    case TodosActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null,
      };
    case TodosActionTypes.FETCH_TODOS_ERROR:
      return {
        ...state,
        todos: [],
        loading: false,
        error: action.payload,
      };
    case TodosActionTypes.SET_TODO:
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};
