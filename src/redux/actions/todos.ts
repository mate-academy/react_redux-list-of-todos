import { Todo } from '../../types/Todo';
import { ActionTypes } from '../../types/actionTypes';

export interface ActionSetTodos {
  type: ActionTypes.SET_TODOS;
  payload: {
    todos: Todo[],
  };
}

export interface ActionSetCurrentUser {
  type: ActionTypes.SELECT_USER;
  payload: {
    userId: number | null;
  };
}

export interface ActionDeleteTodo {
  type: ActionTypes.DELETE_TODO;
  payload: {
    todoId: number;
  };
}

export const setTodos = (todos: Todo[]) => ({
  type: ActionTypes.SET_TODOS,
  payload: {
    todos,
  },
});

export const setSelectedUser = (userId: number | null) => ({
  type: ActionTypes.SELECT_USER,
  payload: {
    userId,
  },
});

export const deleteTodo = (todoId: number) => ({
  type: ActionTypes.DELETE_TODO,
  payload: {
    todoId,
  },
});
