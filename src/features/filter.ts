export const actions = { /* put action creators here */};

const filterReducer = () => {
  return {
    query: '',
    status: 'all',
  };
};

export default filterReducer;

/* eslint-disable max-len */
// export function checkQuery(query:string, content:string) {
//   return (content.toLowerCase())
//     .includes(query.toLowerCase());
// }

// type AllAction = { type: 'todo/ALL'; payload: string };
// type ActiveAction = { type: 'todo/ACTIVE'; payload: string };
// type CompletedAction = { type: 'todo/COMPLETED'; payload: string };

// type Action = AllAction | ActiveAction | CompletedAction;

// const all = (todo: string): AllAction => ({ type: 'todo/ALL', payload: todo });
// const active = (todo: string): ActiveAction => ({ type: 'todo/ACTIVE', payload: todo });
// const completed = (todo: string): CompletedAction => ({ type: 'todo/COMPLETED', payload: todo });

// export const actions = { all, active, completed };

// const filterReducer = (todos: string[] = [], action: Action) => {
//   switch (action.type) {
//     case 'todo/ACTIVE':
//       return [todos]
//       break;

//     default:
//       break;
//   }
//   return {
//     query: '',
//     status: 'all',
//   };
// };

// export default filterReducer;

// const filteredTodos = todos
//     .filter(({ completed, title }) => {
//       switch (filterBy) {
//         case SortType.ACTIVE:
//           return !completed && checkQuery(query, title);

//         case SortType.COMPLETED:
//           return completed && checkQuery(query, title);

//         default:
//           return checkQuery(query, title);
//       }
//     });
