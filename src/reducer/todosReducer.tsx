import { Todo } from '../Types/Todo';
import { TODOS_LOAD } from './types';

const initialState = {
  todos: [] as Todo[],
};

const getNewTodos = (todoInfo: any) => {
  return todoInfo.map((res: Todo) => {
    return {
      title: res.title,
      id: res.id,
      userId: res.userId,
      completed: res.completed,
    };
  });
};

export const todosReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TODOS_LOAD:
      return {
        ...state,
        todos: getNewTodos(action.data),
      };

    default:
      return state;
  }
};
