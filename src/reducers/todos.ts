import {AnyAction} from "redux";
import {DELETE_TODO, INIT_TODOS} from "../actions/types";

const todosReducer = (todos: Todo[] = [], action: AnyAction): Todo[] => {
  switch (action.type) {
    case INIT_TODOS:
      return action.todos;
    case DELETE_TODO:
      return todos.filter(todo => action.todoId !== todo.id)
    default:
      return todos;
  }
};

export default todosReducer;
