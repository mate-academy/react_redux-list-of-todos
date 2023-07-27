import { Todo } from '../types/Todo';

interface SetTodosAction {
  type: 'todos/SET',
  payload: Todo[],
}

interface AddTodosAction {
  type: 'todos/ADD',
  payload: Todo,
}

interface RemoveTodosAction {
  type: 'todos/REMOVE',
  payload: Todo,
}

enum TodosActionTypes {
  Set = 'todos/SET',
  Add = 'todos/ADD',
  Remove = 'todos/REMOVE',
}

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
    case TodosActionTypes.Set:
      return [...action.payload];
    case TodosActionTypes.Add:
      return [...state, action.payload];
    case TodosActionTypes.Remove:
      return state.filter(tod => tod.id !== action.payload.id);
    default:
      return state;
  }
};

export default todosReducer;
