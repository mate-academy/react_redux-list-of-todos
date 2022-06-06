import { Action, StateTodo, TodoAction } from '../Types/types';

const defaultTodo:StateTodo = {
  todos: [],
  loading: false,
  error: null,
  query: '',
  sortedTodos: [],
  completeStatus: 'All',
  userId: 0,
  user: null,
  isLoadingError: false,
};

export const TodoReducer = (
  state:StateTodo = defaultTodo,
  action:TodoAction,
):StateTodo => {
  switch (action.type) {
    case Action.ADD_TODOS_FROM_SERVER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Action.SUCCES_ADD_TODO:
      return {
        ...state,
        loading: false,
        error: null,
        todos: action.payload,
      };

    case Action.ERROR_ADD_TODO:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Action.FILTER_BY_NAME:
      return {
        ...state,
        query: action.payload,
      };
    case Action.SET_COMPLETE_STATUS:
      return {
        ...state,
        completeStatus: action.payload,
      };
    case Action.SORT_TODO:
      return {
        ...state,
        sortedTodos: action.payload.filter(todo => {
          switch (state.completeStatus) {
            case 'All':
              return todo && todo.title.toLowerCase().includes(state.query);
            case 'Complete':
              return todo.completed
              && todo.title.toLowerCase().includes(state.query);
            case 'notComplete':
              return !todo.completed
              && todo.title.toLowerCase().includes(state.query);
            default:
              return 0;
          }
        }),
      };
    case Action.SET_RANDOM:
      return {
        ...state,
        sortedTodos:
        action.payload.map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),
      };
    case Action.DELETE_TODO:
      return {
        ...state,
        todos: state.sortedTodos.filter(
          todo => action.payload !== todo.id,
        ),
      };
    case Action.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case Action.ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Action.IS_LOADING_ERROR:
      return {
        ...state,
        isLoadingError: action.payload,
      };
    default:
      return state;
  }
};
