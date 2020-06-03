import { Action } from 'redux';

const LOAD_TODOS = 'LOAD_TODOS';
const DELETE_TODO = 'DELETE_TODO';

type LoadTodos = Action<typeof LOAD_TODOS> & { todos: Todo[] };
type DeleteTodo = Action<typeof DELETE_TODO> & { id: number };

export const setTodosAction = (todos: Todo[]): LoadTodos => ({
  type: LOAD_TODOS,
  todos,
});
export const deleteTodoAction = (id: number): DeleteTodo=> ({
  type: DELETE_TODO,
  id,
});

type Todos = LoadTodos | DeleteTodo;

const todosReducer = (state = [] as Todo[], action: Todos) => {
  switch (action.type) {
    case LOAD_TODOS:
      return action.todos;

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

export default todosReducer;
