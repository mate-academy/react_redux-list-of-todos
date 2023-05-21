import { Status } from '../types/Status';

const ALL = 'filter/ALL';
const ACTIVE = 'filter/ACTIVE';
const COMPLETED = 'filter/COMPLETED';

type FilterAll = { type: typeof ALL } & State;
type FilterACTIVE = { type: typeof ACTIVE } & State;
type FilterCOMPLETED = { type: typeof COMPLETED } & State;

type Action = FilterAll | FilterACTIVE | FilterCOMPLETED;
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

const initial: State = {
  status: 'all',
  query: '',
};

export const actions = { filterAll, filterActive, filterCompleted };

const filterReducer = (state: State = initial, action: Action): State => {
  const { status, query } = action;

  if (status && query) {
    return {
      status,
      query,
    };
  }

  return state;
};

export default filterReducer;
