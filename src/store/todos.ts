import { AnyAction } from 'redux';


const HANDLE_SUCCES = 'HANDLE_SUCCES';
const DELETE_TODO = 'DELETE_TODO';
const SORT_TODOS = 'SORT_TODOS';

export const loadingTodos = (todosList: Todo[]) => ({ type: HANDLE_SUCCES, todosList });
export const deleteTodo = (todosList: Todo[]) => ({ type: DELETE_TODO, todosList });
export const sortTodos = (todosList: Todo[]) => ({ type: SORT_TODOS, todosList });


const reducer = (todosList: Todo[] = [], action: AnyAction) => {
  switch (action.type) {
    case HANDLE_SUCCES:
      return action.todosList;
    case DELETE_TODO:
    case SORT_TODOS:
      return action.todosList;
    default:
      return todosList;
  }
};

export default reducer;
