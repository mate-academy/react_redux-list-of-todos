import { AnyAction } from 'redux';

// action types
const GET_TODOS = 'GET_TODOS';
const REMOVE_TODO = 'REMOVE_TODO';

// action creator
export const actions = {
  getTodos: (payload: Todo[]) => ({ type: GET_TODOS, payload }),
  removeTodo: (payload: Todo) => ({ type: REMOVE_TODO, payload }),
};

// initial state
export type TodosState = {
  todos: Todo[],
};

const todosState: TodosState = {
  todos: [],
};

// reducer
export const todosReducer = (state = todosState, action: AnyAction) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};
