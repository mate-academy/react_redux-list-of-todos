type AllAction = { type: 'filter/ALL', payload: string };
type ActiveAction = { type: 'filter/ACTIVE', payload: string };
type CompletedAction = { type: 'filter/COMPLETED', payload: string };
type QueryAction = { type: 'filter/QUERY', payload: string };
type ResetQueryAction = { type: 'filter/RESET' };

type Actions = AllAction
| ActiveAction
| CompletedAction
| QueryAction
| ResetQueryAction;

const all = (value: string): AllAction => (
  { type: 'filter/ALL', payload: value });
const active = (value: string): ActiveAction => (
  { type: 'filter/ACTIVE', payload: value });
const completed = (value: string): CompletedAction => (
  { type: 'filter/COMPLETED', payload: value });
const query = (value: string): QueryAction => (
  { type: 'filter/QUERY', payload: value });
const resetQuery = (): ResetQueryAction => ({ type: 'filter/RESET' });

export const actions = {
  all,
  active,
  completed,
  query,
  resetQuery,
};

type Filter = {
  query: string,
  status: string,
};

const startFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (filter: Filter = startFilter, action: Actions) => {
  switch (action.type) {
    case 'filter/ALL':
      return { ...filter, status: action.payload };

    case 'filter/ACTIVE':
      return { ...filter, status: action.payload };

    case 'filter/COMPLETED':
      return { ...filter, status: action.payload };

    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    case 'filter/RESET':
      return { ...filter, query: startFilter.query };

    default:
      return filter;
  }
};

export default filterReducer;
