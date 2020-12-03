import { AnyAction } from 'redux';
import { Todos } from '../components/interfaces';

const SET_TODOS = 'SET_TODOS';
const RANDOMIZE = 'RANDOMIZE';
const CHECK_ON_COMPLETED_TODOS = 'CHECK_ON_COMPLETED_TODOS';
const REMOVE = 'REMOVE';

export const setTodos = (todos: Todos[]) => ({ type: SET_TODOS, todos});
export const randomize = () => ({ type: RANDOMIZE });
export const checkOnCompletedTodos = (todoId: number) => ({ type: CHECK_ON_COMPLETED_TODOS, todoId});
export const removeTodo = (todoId: number) => ({ type: REMOVE, todoId});

const reducer = (todos = [], action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;

    case RANDOMIZE:
      return [...todos].sort(() => 0.5 - Math.random());

    case CHECK_ON_COMPLETED_TODOS:
      return todos.map((todo: any) => todo.id !== action.todoId
        ? todo
        : ({
          ...todo,
          completed: !todo.completed,
        })
      )

    case REMOVE:
      return [...todos].filter((todo: Todos) => todo.id !== action.todoId);

    default:
      return todos;
  }
};

export default reducer;
