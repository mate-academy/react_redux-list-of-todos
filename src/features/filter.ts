import { Status } from '../types/Status';

type ChangeFilterAction = { type: 'filter/changeFilter'; payload: string; };
type ChangeQueryAction = { type: 'filter/changeQuery'; payload: string; };
type ClearQueryAction = { type: 'filter/clearQuery'; payload: string; };
type Actions = ChangeFilterAction | ChangeQueryAction | ClearQueryAction;

const changeFilter = (filter: Status): ChangeFilterAction => (
  { type: 'filter/changeFilter', payload: filter }
);
const changeQuery = (query: string): ChangeQueryAction => (
  { type: 'filter/changeQuery', payload: query }
);
const clearQuery = (): ChangeQueryAction => (
  { type: 'filter/changeQuery', payload: '' }
);

const initialState = { query: '', filter: 'all' };

const filterReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'filter/changeFilter':
      return { ...state, filter: action.payload };
    case 'filter/changeQuery':
    case 'filter/clearQuery':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export const actions = { changeFilter, changeQuery, clearQuery };
export default filterReducer;
