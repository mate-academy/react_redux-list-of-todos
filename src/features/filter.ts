// import { Status } from '../types/Status';

// type FilterAll = {
//   type: 'todos/ALL',
//   payload: {
//     status: Status,
//     query: string,
//   }
// };

// type FilterActive = {
//   type: 'todos/ACTIVE',
//   payload: {
//     status: Status,
//     query: string,
//   }
// };

// type FilterCompleted = {
//   type: 'todos/COMPLETED',
//   payload: {
//     status: Status,
//     query: string,
//   }
// };

// type Action = FilterAll | FilterActive | FilterCompleted;

// type State = {
//   query: string;
//   status: Status;
// };

// const filterAll = (status: Status, query: string): FilterAll => ({
//   type: 'todos/ALL',
//   payload: {
//     status,
//     query,
//   },
// });

// const filterActive = (status: Status, query: string): FilterActive => ({
//   type: 'todos/ACTIVE',
//   payload: {
//     status,
//     query,
//   },
// });

// const filterComplited = (status: Status, query: string): FilterCompleted => ({
//   type: 'todos/COMPLETED',
//   payload: {
//     status,
//     query,
//   },
// });

// export const actions = { filterAll, filterActive, filterComplited };
// const initialState: State = {
//   query: '',
//   status: Status.ALL,
// };

// const filterReducer = (state: State = initialState, action: Action): State => {
//   switch (action.type) {
//     case 'todos/ALL':
//       return {
//         query: action.payload.query,
//         status: action.payload.status,
//       };

//     case 'todos/ACTIVE':
//       return {
//         query: action.payload.query,
//         status: action.payload.status,
//       };

//     case 'todos/COMPLETED':
//       return {
//         query: action.payload.query,
//         status: action.payload.status,
//       };

//     default:
//       return state;
//   }
// };

// export default filterReducer;
import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SETSTATUS',
  payload: Status
};

type SetQuery = {
  type: 'filter/SETQUERY',
  payload: string
};

type Action = SetStatus | SetQuery;

type State = {
  query: string;
  status: Status;
};

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SETQUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };
const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SETSTATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SETQUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
