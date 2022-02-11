import { AnyAction, Dispatch } from 'redux';
import { deleteTodo, getTodos } from '../api';
import { Filter, State, Todo } from '../react-app-env';

enum ActionTypes {
  SetTodos = 'todos/set',
  CheckTodo = 'todos/check',
}

export const todosActions = {
  setTodos: (todos: Todo[]): AnyAction => ({
    type: ActionTypes.SetTodos,
    value: todos,
  }),

  loadTodos: ({ query, status }: Filter) => async (dispatch: Dispatch<AnyAction>) => {
    const todos = await getTodos(status);
    const filteredTodos = todos.filter(todo => todo.title.includes(query));

    dispatch(todosActions.setTodos(filteredTodos));
  },

  checkTodo: (todoId: number): AnyAction => ({
    type: ActionTypes.CheckTodo,
    value: todoId,
  }),

  deleteTodo: (todoId: number, filter: Filter) => async (dispatch: Dispatch<AnyAction>) => {
    await deleteTodo(todoId);

    await todosActions.loadTodos(filter)(dispatch);
  },
};

export const todoSelectors = {
  getTodos: (state: State): Todo[] => state.todos,
};

export const todosReducer = (state: Todo[] = [], action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SetTodos:
      return [...action.value];
    case ActionTypes.CheckTodo:
      return state.map(todo => {
        if (todo.id !== action.value) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    default:
      return state;
  }
};
