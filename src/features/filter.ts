import { FilterOption } from '../enums/FilterOptions';

type SetQueryAction = {
  type: 'filter/SETQUERY',
  payload: string,
};

type SetStatusAction = {
  type: 'filter/SETSTATUS',
  payload: FilterOption,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: query,
});

const setStatus = (status: FilterOption): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: FilterOption,
};

type Action = SetStatusAction | SetQueryAction;

const INITIAL_STATE: State = {
  query: '',
  status: FilterOption.All,
};

const filterReducer = (
  filter = INITIAL_STATE,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return {
        ...filter,
        query: action.payload,
      };

    case 'filter/SETSTATUS':
      return {
        ...filter,
        status: action.payload,
      };

    default:
      return filter;
  }
};

export default filterReducer;
