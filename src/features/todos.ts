import type { RootState } from '../app/store';
import { Todo } from '../types/Todo';

export enum TodosActionType {
  SetTodos = 'todos/SET',
}

type SetTodosAction = {
  type: TodosActionType.SetTodos;
  payload: Todo[]
};

const setTodos = (todos: Todo[]) => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

type TodosAction = SetTodosAction;

export const selectedTodos = {
  getTodos: (state: RootState) => state.todos,
  getVisibleTodos: (state: RootState) => {
    const { todos, filter } = state;
    const { query, status } = filter;

    const slectedByStatus = todos.filter(todo => {
      switch (status) {
        case 'active':
          return todo.completed;

        case 'completed':
          return !todo.completed;

        case 'all':
        default:
          return todo;
      }
    });

    return slectedByStatus.filter(todo => (
      todo.title.toLowerCase()
        .includes(query.toLowerCase())
    ));
  },
};

const todosReducer = (todos: Todo[] = [], action: TodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export const actions = { setTodos };

export default todosReducer;
