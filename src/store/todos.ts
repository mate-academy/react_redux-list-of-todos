import { Action } from 'redux';
import { INIT_TODOS, DELETE_TODO } from '../constants/actionTypes';

type InitTodosAction = Action<typeof INIT_TODOS> & {
  todos: Todo[];
};
type DeleteTodosAction = Action<typeof DELETE_TODO> & {
  todoId: number;
};

export const initTodos = (todos: Todo[]): InitTodosAction => ({
  type: INIT_TODOS,
  todos,
});
export const deleteTodo = (todoId: number): DeleteTodosAction => ({
  type: DELETE_TODO,
  todoId,
});

type TodosAction = InitTodosAction | DeleteTodosAction;

const reduce = (todos: Todo[] = [], action: TodosAction): Todo[] => {
  switch (action.type) {
    case INIT_TODOS:
      return action.todos;
    case DELETE_TODO:
      return todos.filter(todo => action.todoId !== todo.id);
    default:
      return todos;
  }
};

export default reduce;
