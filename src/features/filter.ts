import { Status } from '../types/Status';

const ALL = 'filter/ALL';
const ACTIVE = 'filter/ACTIVE';
const COMPLETED = 'filter/COMPLETED';
const CLEAR = 'filter/CLEAR';

const SOMEOFTYPES = [ALL, ACTIVE, COMPLETED, CLEAR];

type FilterAll = { type: typeof ALL } & State;
type FilterACTIVE = { type: typeof ACTIVE } & State;
type FilterCOMPLETED = { type: typeof COMPLETED } & State;
type QueryCLEAR = { type: typeof CLEAR } & State;

type Action = FilterAll | FilterACTIVE | FilterCOMPLETED | QueryCLEAR;
type State = { status: Status, query: string };

const filterAll = (query: string): FilterAll => ({
  type: ALL,
  status: 'all',
  query,
});

const filterActive = (query: string): FilterACTIVE => ({
  type: ACTIVE,
  status: 'active',
  query,
});

const filterCompleted = (query: string): FilterCOMPLETED => ({
  type: COMPLETED,
  status: 'completed',
  query,
});

const queryClear = (filter: Status): QueryCLEAR => ({
  type: CLEAR,
  status: filter,
  query: '',
});

const initial: State = {
  status: 'all',
  query: '',
};

export const actions = {
  filterAll,
  filterActive,
  filterCompleted,
  queryClear,
};

const filterReducer = (state: State = initial, action: Action): State => {
  const { status, query = '' } = action;

  if (SOMEOFTYPES.some(type => type === action.type)) {
    return { status, query };
  }

  return state;
};

export default filterReducer;
