import { Action } from 'redux';

const INIT_TODOS = 'INIT_TODOS';
const DELETE_TODO = 'DELETE_TODO';

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

type AlowwedActions = InitTodosAction | DeleteTodosAction;

const todosReducer = (todos: Todo[] = [], action: AlowwedActions): Todo[] => {
  switch (action.type) {
    case DELETE_TODO:
      return todos.filter(todo => action.todoId !== todo.id);
    case INIT_TODOS:
      return action.todos;
    default:
      return todos;
  }
};

export default todosReducer;
