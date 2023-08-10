// import { Todo } from '../types/Todo';

// type FilterAllAction = {
//   type: 'todos/ALL',
//   payload: Todo[],
// };

// type FilterActiveAction = {
//   type: 'todos/ACTIVE',
//   payload: Todo[],
// };

// type FilterCompletedAction = {
//   type: 'todos/COMPLETED',
//   payload: Todo[],
// };

// type Action = FilterAllAction
//   | FilterActiveAction
//   | FilterCompletedAction;

// const filterActive = (todos: Todo[]): FilterActiveAction => ({
//   type: 'todos/ACTIVE',
//   payload: todos,
// });

// const filterCompleted = (todos: Todo[]): FilterCompletedAction => ({
//   type: 'todos/COMPLETED',
//   payload: todos,
// });

// const filterAll = (todos: Todo[]): FilterCompletedAction => ({
//   type: 'todos/COMPLETED',
//   payload: todos,
// });

const filterReducer = (
  // todos: Todo[],
  //  action: Action,
) => {
  // switch (action.type) {
  //   case 'todos/ALL':
  //     return todos;

  //   case 'todos/ACTIVE':
  //     return todos.filter(todo => !todo.completed);

  //   case 'todos/COMPLETED':
  //     return todos.filter(todo => todo.completed);

  //   default: return todos;
  // }

  return {
    query: '',
    status: 'all',
  };
};

export const actions = {};

export default filterReducer;
