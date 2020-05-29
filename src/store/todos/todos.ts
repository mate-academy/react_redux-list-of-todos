import { AnyAction } from 'redux';

const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';

export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, todos });
export const deleteTodo = (id: number) => ({ type: DELETE_TODO, id });

export const getTodos = (state: RootState) => state.todos;

interface initState {
  todos: Todo[];
}

const initialState: initState = {
  todos: [],
}

export const todosReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return { todos: action.todos };

    case DELETE_TODO:
      return { todos: state.todos.filter(todo => todo.id !== action.id) };

    default:
      return state;
  }
}
