type SetStatus = {
  type: 'filterStatus/SET';
  payload: string;
};

type SetQuery = {
  type: 'filterQuery/SET';
  payload: string;
};

type ClearQuery = {
  type: 'filterQuery/CLEAR';
};

export const setStatus = (status: string): SetStatus => ({
  type: 'filterStatus/SET',
  payload: status,
});

export const setQuery = (query: string): SetQuery => ({
  type: 'filterQuery/SET',
  payload: query,
});

export const clearQuery = (): ClearQuery => ({
  type: 'filterQuery/CLEAR',
});

const inititalFilters = {
  query: '',
  status: 'all',
};

type Action = SetStatus | ClearQuery | SetQuery;

const filterReducer = (
  state = inititalFilters,
  action: Action,
) => {
  switch (action.type) {
    case ('filterStatus/SET'):
      return {
        ...state,
        status: action.payload,
      };

    case ('filterQuery/SET'):
      return {
        ...state,
        query: action.payload,
      };

    case ('filterQuery/CLEAR'):
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export const actions = { setStatus, clearQuery };

export default filterReducer;
