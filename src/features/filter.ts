export const actions = { /* put action creators here */};

const filterReducer = () => {
  return {
    query: '',
    status: 'all',
  };
};

export default filterReducer;

// imported from other fille
// import { Todo } from '../types/Todo';
// import { Status } from '../types/Status';

// type Action = {
//   type: Status
// };

// enum ActionType {
//   active = 'active',
//   completed = 'completed',
//   all = 'all',
// }

// const todosReducer = (todos: Todo[], action: Action): Todo[] => {
//   switch (action.type) {
//     case ActionType.active:
//       return todos.filter(todo => todo.completed === false);
//     case ActionType.completed:
//       return todos.filter(todo => todo.completed === true);
//     default:
//       return todos;
//   }
// };

// export todosReducer;
