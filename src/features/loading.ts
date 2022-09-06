type SetTodosLoading = {
  type: 'SET_TODOS_LOADING',
  payload: boolean,
};

type RemoveTodosLoading = {
  type: 'REMOVE_TODOS_LOADING',
  payload: boolean,
};

type SetTodoLoading = {
  type: 'SET_TODO_LOADING',
  payload: boolean,
};

type RemoveTodoLoading = {
  type: 'REMOVE_TODO_LOADING',
  payload: boolean,
};

type Action = (
  SetTodoLoading
  | RemoveTodoLoading
  | SetTodosLoading
  | RemoveTodosLoading
);

const setTodosLoading = ():SetTodosLoading => (
  { type: 'SET_TODOS_LOADING', payload: true });

const removeTodosLoading = ():RemoveTodosLoading => (
  { type: 'REMOVE_TODOS_LOADING', payload: false });

const setTodoLoading = ():SetTodoLoading => (
  { type: 'SET_TODO_LOADING', payload: true });

const removeTodoLoading = ():RemoveTodoLoading => (
  { type: 'REMOVE_TODO_LOADING', payload: false });

export const loaderActions = (
  {
    setTodosLoading,
    removeTodosLoading,
    setTodoLoading,
    removeTodoLoading,
  }
);

const initialState = {
  todosLoading: true,
  todoLoading: true,
};

const loadingReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'SET_TODOS_LOADING':
      return {
        ...state,
        todosLoading: true,
      };
    case 'REMOVE_TODOS_LOADING':
      return {
        ...state,
        todosLoading: false,
      };
    case 'SET_TODO_LOADING':
      return {
        ...state,
        todoLoading: true,
      };
    case 'REMOVE_TODO_LOADING':
      return {
        ...state,
        todoLoading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
