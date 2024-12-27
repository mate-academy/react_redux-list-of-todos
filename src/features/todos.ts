/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodosAction;

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;

// Задание: Распределение уникальных комбинаций
// Напишите функцию, которая принимает массив чисел и целевое число target,
// и возвращает все уникальные комбинации чисел, где сумма каждой комбинации равна target.
// При этом каждое число может быть использовано ровно один раз.
