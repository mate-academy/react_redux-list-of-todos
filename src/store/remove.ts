import { AnyAction } from 'redux';
import { HANDLE_REMOVE } from './actionTypes';

const reducer = (todos: PreparedTodos[], action: AnyAction) => {
  switch (action.type) {
    case HANDLE_REMOVE:
      return {
        todos: todos.filter(task => task.id !== action.taskId),
      };
    default:
      return todos;
  }
};


export default reducer;
