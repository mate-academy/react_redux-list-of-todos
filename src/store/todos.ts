import { AnyAction } from 'redux';

const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';

export const setTodos = (todos: Todo[]) => ({type: SET_TODOS, todos});
export const deleteTodo = (id: number) => ({type: DELETE_TODO, id});

export const todosReducer = (state = [] as Todo[], action: AnyAction) => {
  switch(action.type) {
    case SET_TODOS:
      return action.todos;

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    default: return state;
  }
}
