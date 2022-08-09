import { AnyAction } from 'redux';

import { Todo } from '../types/Todo';

const SET_TODO = 'SET_TODO';

export type TodoType = {
  todo: {
    id: number,
    title: string,
    completed: boolean,
    userId: number,
  }
};

export const todoState: TodoType = {
  todo: {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  },
};

export const actions = {
  setTodos: (todo: Todo) => ({ type: SET_TODO, todo }),
};

const todoReducer = (state = todoState, action: AnyAction): TodoType => {
  switch (action.type) {
    case SET_TODO:
      return {
        todo: action.todo,
      };
    default:
      return state;
  }
};

export default todoReducer;
