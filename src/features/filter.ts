import { Status } from '../types/Status';
import { Filter } from '../types/Filter';

type SetStatusActionAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setStatus = (status: Status): SetStatusActionAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };

type Actions = SetStatusActionAction | SetQueryAction;

const filterInitialValue: Filter = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  filter: Filter = filterInitialValue,
  action: Actions,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY': {
      return { ...filter, query: action.payload };
    }

    case 'filter/SET_STATUS': {
      return { ...filter, status: action.payload };
    }

    default: {
      return filter;
    }
  }
};

export default filterReducer;
