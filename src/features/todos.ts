/* eslint-disable */
import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
}

// type GetTodoAction = {
//   type: 'todos/GET',
// }

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});
// const getTodos = (): GetTodoAction => ({
//   type: 'todos/GET',
// })

type Action = SetTodosAction;

const todosReducer = (_todos: Todo[] = [], action: Action) => {
  switch (action.type) {
    case 'todos/SET':
      return { todos: action.payload };
    // case 't':
    //   return todos;
    default:
      return [];
  }

};
export const actions = { setTodos };

export default todosReducer;
