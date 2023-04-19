import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

type AddTodosAction = {
  type: 'todos/ADD',
  payload: Todo,
};

type RemoveTodosAction = {
  type: 'todos/REMOVE',
  payload: Todo,
};

type Action = SetTodosAction | AddTodosAction | RemoveTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const addTodo = (todo: Todo): AddTodosAction => ({
  type: 'todos/ADD',
  payload: todo,
});

const removeTodo = (todo: Todo): RemoveTodosAction => ({
  type: 'todos/REMOVE',
  payload: todo,
});

export const actions = { setTodos, addTodo, removeTodo };

type State = Todo[];

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    case 'todos/ADD':
      return [...state, action.payload];
    case 'todos/REMOVE':
      return state.filter(tod => tod.id !== action.payload.id);

    default:
      return state;
  }
};

export default todosReducer;
