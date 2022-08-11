import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[]
  choosenTodo: Todo | null
};

type SetTodosAction = {
  type: 'todos/set'
  payload: Todo[]
};

type ChoseTodoAction = {
  type: 'todo/choose'
  payload: number | null
};

const initialState = {
  todos: [],
  choosenTodo: null,
};

export type TodosActions = SetTodosAction | ChoseTodoAction;

export const actions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'todos/set',
    payload: todos,
  }),

  choseTodo: (todoId: number | null): ChoseTodoAction => ({
    type: 'todo/choose',
    payload: todoId,
  }),
};

export const todosReducer = (
  todosState: TodosState = initialState,
  action: TodosActions,
): TodosState => {
  switch (action.type) {
    case 'todos/set':
      return {
        ...todosState,
        todos: action.payload,
      };

    case 'todo/choose':
      return {
        ...todosState,
        choosenTodo: todosState.todos
          .find(todo => todo.id === action.payload) || null,
      };

    default:
      return todosState;
  }
};
