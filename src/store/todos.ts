import { AnyAction } from 'redux';
import { Dispatch } from 'react';
import { getTodos } from '../api/api';

export const todosTypeActions = {
  LOAD_TODOS: 'LOAD_TODOS',
  SHOW_ACTIVE: 'LOAD_ACTIVE',
  SHOW_COMPLETED: 'LOAD_COMPLETED',
  SHOW_ALL: 'SHOW_ALL',
  DELETE_TODO: 'DELETE_TODO',
  FILTER_TODOS: 'FILTER_TODOS',
};

const {
  LOAD_TODOS,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  SHOW_ALL,
  DELETE_TODO,
  FILTER_TODOS,
} = todosTypeActions;

type Todos = {
  todos: Todo[];
  visibleTodos: Todo[];
  filterSettings: string;
};

const initialState: Todos = {
  todos: [],
  visibleTodos: [],
  filterSettings: todosTypeActions.SHOW_ALL,
};

export const actionCreator = {
  loadAllTodos: (todos: Todo[]) => ({ type: LOAD_TODOS, payload: todos }),
  showAllTodos: (query: string) => ({ type: SHOW_ALL, payload: query }),
  showActiveTodos: (query: string) => ({ type: SHOW_ACTIVE, payload: query }),
  showCompletedTodos: (query: string) => ({ type: SHOW_COMPLETED, payload: query }),
  deleteTodo: (todoId: number) => ({ type: DELETE_TODO, payload: todoId }),
  filterTodos: (query: string) => {
    return ({ type: FILTER_TODOS, payload: query });
  },
};

export const loadTodos = () => {
  return (dispatch : Dispatch<{ type: string, payload: Todo[] }>) => getTodos()
    .then(result => dispatch(actionCreator.loadAllTodos(result)));
};

const todosReducer = (state = initialState, actions: AnyAction) => {
  switch (actions.type) {
    case LOAD_TODOS:
      return {
        filterSettings: todosTypeActions.SHOW_ALL,
        todos: [...actions.payload],
        visibleTodos: [...actions.payload],
      };
    case SHOW_ACTIVE:
      return {
        ...state,
        filterSettings: todosTypeActions.SHOW_ACTIVE,
        visibleTodos: state.todos
          .filter(todo => !todo.completed
            && todo.title.toLowerCase().includes(actions.payload.toLowerCase())),
      };
    case SHOW_COMPLETED:
      return {
        ...state,
        filterSettings: todosTypeActions.SHOW_COMPLETED,
        visibleTodos: state.todos
          .filter(todo => todo.completed
            && todo.title.toLowerCase().includes(actions.payload.toLowerCase())),
      };
    case SHOW_ALL:
      return {
        ...state,
        filterSettings: SHOW_ALL,
        visibleTodos: state.todos
          .filter(todo => todo.title.toLowerCase().includes(actions.payload.toLowerCase())),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== actions.payload),
        visibleTodos: state.visibleTodos.filter(todo => todo.id !== actions.payload),
      };
    case FILTER_TODOS:
      return {
        ...state,
        visibleTodos: state.todos
          .filter(todo => todo.title.toLowerCase().includes(actions.payload.toLowerCase()))
          .filter(todo => {
            if (state.filterSettings === SHOW_ACTIVE && todo.completed) {
              return false;
            }

            if (state.filterSettings === SHOW_COMPLETED && !todo.completed) {
              return false;
            }

            return true;
          }),
      };
    default:
      return state;
  }
};

export default todosReducer;
