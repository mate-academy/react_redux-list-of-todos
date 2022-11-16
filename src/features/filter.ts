import { Status } from '../types/Status';

type SetQuery = {
  type: 'filter/SETQUERY',
  payload: string;
};

type SetSelect = {
  type: 'filter/SETSELECT',
  payload: Status;
};

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SETQUERY',
  payload: query,
});

const setSelect = (select: Status): SetSelect => ({
  type: 'filter/SETSELECT',
  payload: select,
});

type State = {
  query: string,
  select: Status,
};

type Action = SetQuery | SetSelect;

const initState: State = {
  query: '',
  select: 'all',
};

export const actions = { setQuery, setSelect };

const filterReducer = (
  state: State = initState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SETSELECT':
      return {
        ...state,
        select: action.payload,
      };

    default:
      return { ...state };
  }
};

export default filterReducer;
