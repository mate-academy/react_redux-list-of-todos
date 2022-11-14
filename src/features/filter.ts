// export const actions = { /* put action creators here */};

// const filterReducer = () => {
//   return {
//     query: '',
//     status: 'all',
//   };
// };

/* eslint-disable max-len */
export function checkQuery(query:string, content:string) {
  return (content.toLowerCase())
    .includes(query.toLowerCase());
}

type ActiveAction = { type: 'todo/ACTIVE'; payload: string };
type CompletedAction = { type: 'todo/COMPLETED'; payload: string };
type AlldAction = { type: 'todo/ALL'; payload: string };

type Action = ActiveAction | CompletedAction | AlldAction;

const active = (status: string): ActiveAction => ({
  type: 'todo/ACTIVE', payload: status,
});

const completed = (status: string): CompletedAction => ({
  type: 'todo/COMPLETED', payload: status,
});

const all = (status: string): AlldAction => ({
  type: 'todo/ALL', payload: status,
});

const initialState = 'all';

export const actions = { active, completed, all };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'todo/ACTIVE':
      return 'active';

    case 'todo/COMPLETED':
      return 'completed';

    case 'todo/ALL':
      return 'all';

    default:
      return state;
  }
};

export default filterReducer;
