import { Status } from '../types/Status';

interface FilterStatusAction { type: 'todos/STATUS', payload: Status }
interface FilterQueryAction { type: 'todos/QUERY', payload: string }

type Action = FilterStatusAction | FilterQueryAction;

const filterStatus = (status: Status): FilterStatusAction => (
  { type: 'todos/STATUS', payload: status }
);
const filterQuery = (query: string): FilterQueryAction => (
  { type: 'todos/QUERY', payload: query }
);

export const actions = { filterStatus, filterQuery };

interface IState {
  status: Status;
  query: string;
}

const initialState: IState = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case 'todos/STATUS':
      return { ...state, status: action.payload };
    case 'todos/QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
